var easyLog = function() {
    console.log(arguments);
    formatLog(arguments);
}

var formatLog = function(args) {
    var d = document.createElement("div");
    d.id = "easyLog";
    for (var i = 0; i < args.length; i++) {
        var arg = JSON.stringify(args[i]);
        var s = document.createElement("span");
        switch (type(args[i])) {
            case 'undefined':
                // s.id = 'undefined';
                s.textContent = arg;
                s.style.color = 'grey';
                break;
            case 'number':
                // s.id = 'number';
                s.textContent = arg;
                s.style.color = 'red';
                break;
            case 'boolean':
                // s.id = 'boolean';
                s.textContent = arg;
                s.style.color = '#990099';
                break;
            case 'string':
                // s.id = 'string';
                s.textContent = arg;
                s.style.color = 'white';
                break;
            case 'function':
                // s.id = 'function';
                s.textContent = args[i];
                s.style.color = 'green';
                break;
            case 'regexp':
                // s.id = 'regexp';
                s.textContent = args[i];
                s.style.color = 'yellow';
                break;
            case 'array':
                // s.id = 'array';
                s.textContent = arg;
                s.style.color = 'blue';
                break;
            case 'date':
                // s.id = 'date';
                s.textContent = arg;
                s.style.color = 'black';
                break;
            case 'error':
                // s.id = 'error';
                s.textContent = args[i];
                s.style.color = 'red';
                break;
            case 'object':
                // s.id = 'object';
                s.textContent = arg;
                s.style.color = 'orange';
                break;
            case 'null':
                // s.id = 'null';
                s.textContent = arg;
                s.style.color = 'pink';
            default:
                s.textContent = arg;
                s.style.color = 'grey';
        }
        s.textContent += " ";
        d.appendChild(s);
    }
    document.body.appendChild(d);
}


var type = function(t) {
    var TYPES = {
        'undefined': 'undefined',
        'number': 'number',
        'boolean': 'boolean',
        'string': 'string',
        '[object Function]': 'function',
        '[object RegExp]': 'regexp',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object Error]': 'error',
        '[object Object]': 'object'
    },
        TOSTRING = Object.prototype.toString;
    return TYPES[typeof t] || TYPES[TOSTRING.call(t)] || (t ? 'object' : 'null');
}

// easyLog(1, "string", [1, 2, 3], null, {
//     'id': 123
// }, undefined, true, false, Math.sin, /z/, new Date, new Error);