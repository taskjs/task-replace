# task-replace
> Replace text in files.

## The "replace" task

### Usage Examples

```js
var replace = new (require('task-replace'))
replace.run(inputs, options, logger)
```

### Options

#### options.search
Type: `string`

A string or regular expression that will be replaced by the new value.

#### options.replace
Type: `string`

A string that replaces the search string or a function to be invoked to create the new string.

#### options.flags
Type: `string`
Default: `'gm'`

A String containing any combination of the RegExp flags:
* g - global match
* i - ignore case
* m - match over multiple lines

This parameter is only used if the search parameter is a string.

## Release History
* 2014-04-04        0.1.0        Initial release.


## License
Copyright (c) 2014 Yuanyan Cao. Licensed under the MIT license.
