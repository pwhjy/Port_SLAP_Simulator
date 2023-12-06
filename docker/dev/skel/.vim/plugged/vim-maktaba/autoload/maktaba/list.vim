
""
" Removes the first instance of {item} from {list}.
" {list} is returned for convenience.
" This is different from |remove()|, which removes a certain index from a list.
" {list} is modified in place and returned for convenience.
" @throws NotFound if {item} is not in {list}.
function! maktaba#list#RemoveItem(list, item) abort
  let l:index = index(a:list, a:item)
  if l:index < 0
    let l:msg = 'Item %s in list %s'
    throw maktaba#error#NotFound(l:msg, string(a:item), string(a:list))
  endif
  call remove(a:list, l:index)
  return a:list
endfunction


""
" Removes duplicates in {list} in-place.
" {list} is returned for convenience.
function! maktaba#list#RemoveDuplicates(list) abort
  " Unfortunately this runs in O(n^2) time.
  " We can't use a dictionary to store seen values because vim dictionaries are
  " dumb: all keys are coerced to strings, empty strings are not allowed as
  " keys, and so on.
  let l:counter = 0
  for l:item in a:list
    let l:index = index(a:list, l:item)
    if l:index >= 0 && l:index < l:counter
      call remove(a:list, l:counter)
    else
      let l:counter += 1
    endif
  endfor
  return a:list
endfunction

""
" Removes all instances of {item} from {list}.
" {list} is modified in place and returned for convenience.
function! maktaba#list#RemoveAll(list, item) abort
  let l:index = index(a:list, a:item)
  while l:index >= 0
    call remove(a:list, l:index)
    let l:index = index(a:list, a:item)
  endwhile
  return a:list
endfunction
