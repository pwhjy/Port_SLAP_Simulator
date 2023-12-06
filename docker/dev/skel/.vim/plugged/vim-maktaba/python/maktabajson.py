"""Python implementations of maktaba#json#Format() and maktaba#json#Parse().

These will be used in place of the Vimscript implementations in recent versions
of Vim (that are compiled with Python support), unless disabled using
maktaba#SetJsonPythonDisabled().
"""

import json
import vim


def _vim2py_deepcopy(value, null, true, false):
    """Return a deep copy of the given Vim value translated to Python types.

    vim.List and vim.Dictionary values are recursively converted to Python list
    and dict objects, respectively, and then all values are checked against the
    'null', 'true', and 'false' (Python) sentinel values, which are converted
    to None, True, and False, respectively.
    """
    if isinstance(value, vim.List):
        value = [_vim2py_deepcopy(e, null, true, false)
                 for e in value]
    elif isinstance(value, vim.Dictionary):
        # vim.Dictionary doesn't support items() or iter() until 7.3.1061.
        value = {_vim2py_deepcopy(k, null, true, false):
                 _vim2py_deepcopy(value[k], null, true, false)
                 for k in value.keys()}

    if value == null:
        return None
    if value == true:
        return True
    if value == false:
        return False

    return value


def _py2vim_scalar(value, null, true, false):
    """Return the given Python scalar translated to a Vim value.

    None, True, and False are returned as the (Vim) sentinel values 'null',
    'true', and 'false', respectively; anything else is returned untouched.
    """
    if value is None:
        return null
    if value is True:
        return true
    if value is False:
        return false
    return value


def _py2vim_list_inplace(value, null, true, false):
    """Convert all the values in the given Python list to Vim values,
    recursively.
    """
    for i in range(len(value)):
        v = value[i]
        if isinstance(v, list):
            _py2vim_list_inplace(v, null, true, false)
        elif isinstance(v, dict):
            _py2vim_dict_inplace(v, null, true, false)
        else:
            value[i] = _py2vim_scalar(v, null, true, false)


def _py2vim_dict_inplace(value, null, true, false):
    """Convert all the values (but not keys) in the given Python dict to Vim
    values, recursively.
    """
    for k in value:
        # JSON only permits string keys, so there's no need to transform the
        # key, just the value.
        v = value[k]
        if isinstance(v, list):
            _py2vim_list_inplace(v, null, true, false)
        elif isinstance(v, dict):
            _py2vim_dict_inplace(v, null, true, false)
        else:
            value[k] = _py2vim_scalar(v, null, true, false)


def format():
    """
    Python implementation of maktaba#json#Format().

    Arguments and return values are passed using a Vim list named 'l:buffer',
    as follows:

    l:buffer[0] - the mapping of null/true/false to the default Vim sentinels.
    l:buffer[1] - the Vim value to format.
    l:buffer[2] - (out) the string result.
    l:buffer[3] - (out) the error message, if there is an error.
    """

    buffer = vim.bindeval('l:buffer')
    custom_values = buffer[0]
    value = buffer[1]
    # Now translate the Vim value to something that uses Python types (e.g.
    # None, True, False), based on the custom values we're using.  Note that
    # this must return a copy of the input, as we cannot store None (or True
    # or False) in a Vim value.  (Doing this also avoids needing to tell
    # json.dumps() how to serialize a vim.List or vim.Dictionary.)

    # Note that to do this we need to check our custom values for equality,
    # which we also can't do if they're a vim.List or vim.Dictionary.
    # Fortunately, there's an easy way to fix that.
    custom_values = _vim2py_deepcopy(custom_values, None, None, None)

    # Now we can use those custom values to translate the real value.
    value = _vim2py_deepcopy(
        value,
        custom_values['null'], custom_values['true'], custom_values['false'])

    try:
        buffer[2] = json.dumps(value, allow_nan=True, separators=(',', ':'))
    except ValueError as e:  # e.g. attempting to format NaN
        buffer[3] = e.message
    except TypeError as e:  # e.g. attempting to format a Function
        buffer[3] = e.message


def parse():
    """
    Python implementation of maktaba#json#Parse().

    Arguments and return values are passed using a Vim list named 'l:buffer',
    as follows:

    l:buffer[0] - the mapping of null/true/false to the (possibly-custom) Vim
                  values.
    l:buffer[1] - the Vim string to parse.
    l:buffer[2] - (out) the Vim value result.
    l:buffer[3] - (out) the error message, if there is an error.
    """
    buffer = vim.bindeval('l:buffer')

    custom_values = buffer[0]
    json_str = buffer[1]
    try:
        value = [json.loads(json_str)]
    except ValueError as e:
        buffer[3] = e.message
        return

    # Now mutate the resulting Python object to something that can be stored
    # in a Vim value (i.e. has no None values, which Vim won't accept).
    _py2vim_list_inplace(
        value,
        custom_values['null'], custom_values['true'], custom_values['false'])

    buffer[2] = value[0]
