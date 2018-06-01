(() => {
    var Enumerable = require("./Enumerable").Enumerable;
    if (typeof Array.prototype.Where !== 'function') {
        Array.prototype.Where = function <T>(predicate: any, context?: any): T[] {
            return <T[]>new Enumerable(this).Where(predicate, context).ToArray();
        };
    }
    if (typeof Array.prototype.Select !== 'function') {
        Array.prototype.Select = function <T>(selector: any, context?: any): T[] {
            return <T[]>new Enumerable(this).Select(selector, context).ToArray();
        };
    }
    if (typeof Array.prototype.Any !== 'function') {
        Array.prototype.Any = function (predicate?: any, context?: any) {
            return new Enumerable(this).Any(predicate, context);
        };
    }
    if (typeof Array.prototype.First !== 'function') {
        Array.prototype.First = function <T>(selector?: any, context?: any) {
            return new Enumerable(this).First(selector, context);
        };
    }
    if (typeof Array.prototype.FirstOrDefault !== 'function') {
        Array.prototype.FirstOrDefault = function (predicate?: any, def?: any, context?: any) {
            return new Enumerable(this).FirstOrDefault(predicate, def, context);
        };
    }
    if (typeof Array.prototype.Last !== 'function') {
        Array.prototype.Last = function <T>(selector?: any, context?: any) {
            return new Enumerable(this).Last(selector, context);
        };
    }
    if (typeof Array.prototype.LastOrDefault !== 'function') {
        Array.prototype.LastOrDefault = function (predicate?: any, def?: any, context?: any) {
            return new Enumerable(this).LastOrDefault(predicate, def, context);
        };
    }
    if (typeof Array.prototype.All !== 'function') {
        Array.prototype.All = function (predicate?: any, context?: any) {
            return new Enumerable(this).All(predicate, context);
        };
    }
})();