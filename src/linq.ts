let LinqBase = require("./LinqBase");

declare interface Array<T> {
    Select<TResult>(selector: (element: T, index: number) => TResult, context?: any): TResult[]
}

(function () {
    var global: any = global;
    var window: any = window || global;
    if (typeof Array.prototype.Select !== 'function') {
        Array.prototype.Select = Array.prototype.map || function (selector, context) {
            context = context || window;
            var arr = [];
            var l = this.length;
            for (var i = 0; i < l; i++)
                arr.push(LinqBase.Selector.call(context, this[i], i, this));
            return arr;
        };
    }
})();





