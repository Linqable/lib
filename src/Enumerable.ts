export class Enumerable<T> {
    private array: Array<T>;
    private window: any;
    constructor(arr: Array<T>) {
        this.array = arr;
    }

    public Select<TResult>(selector: (element: T, index: number) => TResult, context?: any): this {
        var arr = [];
        var l = this.array.length;
        for (var i = 0; i < l; i++)
            arr.push(selector.call(this.getContext(context), this.array[i], i, this.array));
        this.array = arr;
        return this;
    }

    public Where<TResult>(predicate: (element: T, index: number) => boolean, context?: any): this {
        var arr = [];
        var l = this.array.length;
        for (var i = 0; i < l; i++) {
            if (!this.array[i])
                continue;
            try {
                if (predicate.call(this.getContext(context), this.array[i], i, this) === true)
                    arr.push(this.array[i]);
            }
            catch (e) { }
        }
        this.array = arr;
        return this;
    }

    public Any(predicate?: (element: T) => boolean, context?: any): boolean {
        predicate = predicate || this.Predicate;
        var f = this.array.some || function (p, c) {
            var l = this.array.length;
            if (!p) return l > 0;
            while (l-- > 0)
                if (p.call(c, this.array[l], l, this.array) === true) return true;
            return false;
        };
        return f.apply(this.array, [predicate, this.getContext(context)]);
    }
    public ToArray(): Array<T> {
        if (this.array)
            return this.array;
        else return [];
    }

    private getContext(context?: any): any {
        var global: any = global;
        if (typeof (window) === 'undefined') {
            this.window = global;
        } else {
            this.window = window || global;
        }
        return context || this.window;
    }

    private static EqualityComparer(a: any, b: any): boolean {
        return a === b || a.valueOf() === b.valueOf();
    }
    private static SortComparer(a: any, b: any): number {
        if (a === b) return 0;
        if (a === null) return -1;
        if (b === null) return 1;
        if (typeof a == 'string')
            return a.toString().localeCompare(b.toString());
        return a.valueOf() - b.valueOf();
    }
    private Predicate(): boolean {
        return true;
    }
}