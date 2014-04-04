var Execution = require('execution');
var Record = require('record');

module.exports = Execution.extend({
    // The type of option could be HTML5 input types: file, directory, number, range, select,
    // url, email, tel, color, date, time, month, time, week, datetime(datetime-local),
    // string(text), boolean(checkbox), array, regexp, function and object.
    options: {
        search: {
            type: 'string',
            placeholder: 'A string or regular expression that will be replaced by the new value'
        },
        replace: {
            type: 'string',
            placeholder: 'A string that replaces the search string or a function to be invoked to create the new string'
        },
        flags: {
            type: 'string',
            default: 'gm',
            placeholder: 'A String containing any combination of the RegExp flags: g - global match, i - ignore case, m - match over multiple lines. This parameter is only used if the search parameter is a string'
        }
    },
    run: function (inputs, options, logger) {
        return this._run(inputs, options, logger);
    },
    execute: function (resolve, reject) {
        var options = this.options;
        var inputs = this.inputs;
        var logger = this.logger;

        var search = options.search;
        var replace = options.replace;
        var flags = options.flags;
        var escapeRegExp = this.escapeRegExp;

        var records = inputs.map(function (record) {
            var input = record.contents.toString();
            if (typeof search === 'string') {
                search = new RegExp(escapeRegExp(search), flags);
            }
            var output = input.replace(search, replace);
            return new Record({
                path: record.path,
                contents: output
            })
        })

        resolve(records);
    },
    /**
     * Escape strings that are going to be used in a regex.
     * Escapes punctuation that would be incorrect in a regex.
     * @param str
     * @returns {string}
     */
    escapeRegExp: function (str) {
        if (str == null) return '';
        return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
    }
})
