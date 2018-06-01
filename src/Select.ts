(function () {
    var Enumerable = require("./Enumerable").Enumerable;
    if (typeof Array.prototype.Select !== 'function') {
        Array.prototype.Select = function <T>(selector: any, context: any) {
            return new Enumerable(this).Select(selector, context).ToArray();
        };
    }
})();




