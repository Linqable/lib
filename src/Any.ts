(function () {
    if (typeof Array.prototype.Any !== 'function') {
        var Enumerable = require("./Enumerable").Enumerable;
        Array.prototype.Any = function (predicate?: any, context?: any) {
            return new Enumerable(this).Any(predicate, context);
        };
    }
})();