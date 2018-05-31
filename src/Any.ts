(function () {
    var Enumerable = require("./Enumerable").Enumerable;
    if (typeof Array.prototype.Any !== 'function') {
        Array.prototype.Any = function (predicate?: any, context?: any) {
            return new Enumerable(this).Any(predicate, context).ToArray();
        };
    }
})();