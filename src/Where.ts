(function () {
    var Enumerable = require("./Enumerable").Enumerable;
    if (typeof Array.prototype.Where !== 'function') {
        Array.prototype.Where = function (predicate: any, context: any) {
            return new Enumerable(this).Where(predicate, context).ToArray();
        };
    }
})();





