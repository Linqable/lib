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
    if (typeof Array.prototype.Sum !== 'function') {
        Array.prototype.Sum = function (selector?: any, context?: any) {
            return new Enumerable(this).Sum(selector, context);
        };
    }
    if (typeof Array.prototype.Min !== 'function') {
        Array.prototype.Min = function (selector?: any) {
            return new Enumerable(this).Min(selector);
        };
    }
    if (typeof Array.prototype.Max !== 'function') {
        Array.prototype.Max = function (selector?: any) {
            return new Enumerable(this).Max(selector);
        };
    }
    if (typeof Array.prototype.MaxBy !== 'function') {
        Array.prototype.MaxBy = function (selector?: any) {
            return new Enumerable(this).MaxBy(selector);
        };
    }
    if (typeof Array.prototype.MinBy !== 'function') {
        Array.prototype.MinBy = function (selector?: any) {
            return new Enumerable(this).MinBy(selector);
        };
    }
    if (typeof Array.prototype.IsEmpty !== 'function') {
        Array.prototype.IsEmpty = function () {
            return new Enumerable(this).IsEmpty();
        };
    }
    if (typeof Array.prototype.Take !== 'function') {
        Array.prototype.Take = function (count) {
            return new Enumerable(this).Take(count);
        };
    }
})();