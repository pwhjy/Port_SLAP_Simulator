if !exists('s:log_queue')
  let s:log_queue = []
endif

if !exists('s:truncation_count')
  let s:truncation_count = 0
endif

""
" The enumeration dict encapsulating the list of logging levels.
if !exists('maktaba#log#LEVELS')
  let maktaba#log#LEVELS = maktaba#enum#Create([
      \ 'DEBUG',
      \ 'INFO',
      \ 'WARN',
      \ 'ERROR',
      \ 'SEVERE',
      \ ])
  lockvar! maktaba#log#LEVELS
endif

let s:LEVELS = maktaba#log#LEVELS

if !exists('s:notification_level')
  let s:notification_level = s:LEVELS.WARN
endif


""
" @usage {level} {context} {message} [args...]
" Sends a log {message} to the log at {level} on behalf of {context}.
" Extra [args...] are rendered into {message} using |printf()|.
function! s:DoMessage(level, context, message, ...) abort
  call maktaba#ensure#IsNumber(a:level)
  call maktaba#ensure#IsString(a:context)
  call maktaba#ensure#IsString(a:message)
  if len(a:000)
    let l:message = call('printf', [a:message] + a:000)
  else
    let l:message = a:message
  endif

  call s:SendToHandlers([a:level, localtime(), a:context, l:message])
  if s:notification_level isnot -1 && a:level >= s:notification_level
    call s:NotifyMessage(printf('[%s] %s', a:context, l:message), a:level)
  endif
endfunction


""
" Call {Handler} with {logitem}, trying both 1-arg and legacy 4-arg
" signatures.
function! s:CallHandler(Handler, logitem) abort
  try
    call maktaba#function#Call(a:Handler, [a:logitem])
  catch /E119:/
    " Not enough arguments. Fall back to legacy 4-arg handler signature.
    call maktaba#function#Call(a:Handler, a:logitem)
  endtry
endfunction


""
" Append {logitem} to s:log_queue and pass to handlers.
function! s:SendToHandlers(logitem) abort
  let l:maktaba = maktaba#Maktaba()
  " Append to s:log_queue.
  call add(s:log_queue, a:logitem)
  " Vim's 'history' setting controls the length of several history queues. Use
  " it to also control the length of the internal log message queue (leaving
  " room for at least 1 truncation message even if 'history' is set to 0).
  let l:max_messages = max([&history, 1])
  if len(s:log_queue) > l:max_messages
    " Truncate leaving headroom for truncation message.
    let l:truncated_logs =
        \ remove(s:log_queue, 0, len(s:log_queue) - l:max_messages)
    let s:truncation_count += len(l:truncated_logs)
    let l:truncation_timestamp = l:truncated_logs[-1][1]
    let l:truncation_msg = printf(
        \ '%s messages not available because logging was configured late.',
        \ s:truncation_count)
    call insert(
        \ s:log_queue,
        \ [s:LEVELS.INFO, l:truncation_timestamp, 'maktaba', l:truncation_msg],
        \ 0)
  endif

  " Send to handlers.
  for l:Handler in l:maktaba.globals.loghandlers.Items()
    call s:CallHandler(l:Handler, a:logitem)
  endfor
endfunction


function! s:NotifyMessage(message, level) abort
  if a:level >= s:LEVELS.ERROR
    call maktaba#error#Shout(a:message)
  elseif a:level >= s:LEVELS.WARN
    call maktaba#error#Warn(a:message)
  else
    echomsg a:message
  endif
endfunction


""
" Sets the minimum {level} of log messages that will trigger a user
" notification, or -1 to disable notifications. By default, the user will be
" notified after every message logged at WARN or higher.
"
" Notifications will be sent using @function(maktaba#error#Shout) for ERROR
" and SEVERE messages, @function(maktaba#error#Warn) for WARN, and |:echomsg|
" for INFO and DEBUG.
" @throws BadValue
function! maktaba#log#SetNotificationLevel(level) abort
  call maktaba#ensure#IsTrue(
      \ a:level is -1 || maktaba#value#IsIn(a:level, s:LEVELS.Values()),
      \ 'Expected {level} to be maktaba#log#LEVELS value or -1')
  let s:notification_level = a:level
endfunction


""
" Gets a string representing a single log {entry}.
function! s:FormatLogEntry(entry) abort
  let [l:level, l:timestamp, l:context, l:message] = a:entry
  try
    let l:level_name = s:LEVELS.Name(l:level)
  catch /ERROR(NotFound):/
    let l:level_name = '?'
  endtry
  return printf('%s %s [%s] %s',
      \ l:level_name,
      \ strftime('%Y-%m-%dT%H:%M:%S', l:timestamp),
      \ l:context,
      \ l:message)
endfunction


""
" @dict Logger
" Interface for a plugin to send log messages to maktaba.


""
" Creates a @dict(Logger) interface for {context}.
function! maktaba#log#Logger(context) abort
  return {
      \ '_context': a:context,
      \ 'Debug': function('maktaba#log#Debug'),
      \ 'Info': function('maktaba#log#Info'),
      \ 'Warn': function('maktaba#log#Warn'),
      \ 'Error': function('maktaba#log#Error'),
      \ 'Severe': function('maktaba#log#Severe'),
      \ }
endfunction


""
" @dict Logger
" Logs a {message} with [args...] at DEBUG level.
function! maktaba#log#Debug(message, ...) dict abort
  call call('s:DoMessage', [s:LEVELS.DEBUG, self._context, a:message] + a:000)
endfunction


""
" @dict Logger
" Logs a {message} with [args...] at INFO level.
function! maktaba#log#Info(message, ...) dict abort
  call call('s:DoMessage', [s:LEVELS.INFO, self._context, a:message] + a:000)
endfunction


""
" @dict Logger
" Logs a {message} with [args...] at WARN level.
function! maktaba#log#Warn(message, ...) dict abort
  call call('s:DoMessage', [s:LEVELS.WARN, self._context, a:message] + a:000)
endfunction


""
" @dict Logger
" Logs a {message} with [args...] at ERROR level.
function! maktaba#log#Error(message, ...) dict abort
  call call('s:DoMessage', [s:LEVELS.ERROR, self._context, a:message] + a:000)
endfunction


""
" @dict Logger
" Logs a {message} with [args...] at SEVERE level.
function! maktaba#log#Severe(message, ...) dict abort
  call call('s:DoMessage', [s:LEVELS.SEVERE, self._context, a:message] + a:000)
endfunction


""
" @usage {handler} [fire_recent]
" Registers {handler} to receive log entries. {handler} must refer to a
" function that takes 1 argument, an opaque data structure representing a log
" entry. Handlers can collect these and them pass back as a list into maktaba
" log entry manipulation functions like @function(#GetFormattedEntries).
"
" As a legacy fallback, maktaba will support a handler that takes 4 arguments:
" level (number), timestamp (number), context (string), and message (string).
"
" If [fire_recent] is 1 and messages have already been logged before a handler
" is added, some recent messages may be passed to the handler as soon as it's
" registered. The number of messages stored is controlled by vim's 'history'
" setting.
"
" This function returns a function which, when applied, unregisters {handler}.
" Hold on to it if you expect you'll need to remove {handler}.
" @default fire_recent=0
function! maktaba#log#AddHandler(Handler, ...) abort
  let l:maktaba = maktaba#Maktaba()
  call maktaba#ensure#IsCallable(a:Handler)
  let l:fire_recent = maktaba#ensure#IsBool(get(a:, 1, 0))
  let l:remover = l:maktaba.globals.loghandlers.Add(a:Handler)
  if l:fire_recent
    " Send recent queued messages to handler.
    for l:logitem in s:log_queue
      call s:CallHandler(a:Handler, l:logitem)
    endfor
  endif
  return l:remover
endfunction


""
" Returns a list of human-readable strings each representing a log entry from
" {entries}.
" Excludes messages with level less than {minlevel} or not originating from
" one of [contexts]. To get the entire unfiltered list of entries, pass a
" {minlevel} of `maktaba#log#LEVELS.DEBUG` and no [contexts] arg.
" Each item in {entries} must be a value maktaba passed to a log handler call.
function! maktaba#log#GetFormattedEntries(entries, minlevel, ...) abort
  call maktaba#ensure#IsIn(a:minlevel, s:LEVELS.Values())
  let l:filter = 'v:val[0] >= a:minlevel'
  if a:0 >= 1
    let l:contexts = a:1
    call maktaba#ensure#IsList(l:contexts)
    let l:filter .= ' && index(l:contexts, v:val[2]) != -1'
  endif
  let l:filtered_entries = filter(copy(a:entries), l:filter)
  return map(l:filtered_entries, 's:FormatLogEntry(v:val)')
endfunction
