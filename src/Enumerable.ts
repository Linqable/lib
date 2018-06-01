class InvalidOperationError extends Error { }

interface IEnumerable<T> {
    Select<TResult>(selector: (element: T, index: number) => TResult, context?: any): this;
    Where(predicate: (element: T, index: number) => boolean, context?: any): this;
    Any(predicate?: (element: T) => boolean, context?: any): boolean;
    All(predicate: (element: T) => boolean, context?: any): boolean;
    IsEmpty(): boolean;
    Max(selector?: (element: T) => number, context?: any): number;
    Min(selector?: (element: T) => number, context?: any): number;
    MaxBy<TKey>(keySelector: (element: T, context?: any) => TKey): T;
    MinBy<TKey>(keySelector: (element: T, context?: any) => TKey): T;
    Sum(selector?: (element: T, context?: any) => number): number;
    First(predicate?: (element: T, index: number) => boolean, context?: any): T;
    FirstOrDefault(predicate?: (element: T, index: number) => boolean, defaultValue?: T, context?: any): T;
    Last(predicate?: (element: T, index?: number) => boolean, context?: any): T;
    LastOrDefault(predicate?: (element: T, index: number) => boolean, defaultValue?: T, context?: any): T;
    Take<TResult>(count: number): TResult[];
}


class Enumerable<T> implements IEnumerable<T> {
    private array: Array<T>;
    private window: any;
    constructor(arr: Array<T>) {
        this.array = arr;
    }


    public IsEmpty(): boolean {
        this.checkArray();
        return this.array.length == 0;
    }
    public All(predicate: (element: T) => boolean, context?: any): boolean {
        predicate = predicate || this.Predicate;
        let l = this.array.length;
        return this.Where(predicate, context).ToArray().length == l;
    }
    public Max(selector?: (element: T) => number, context?: any): number {
        throw new Error("Method not implemented.");
    }
    public Min(selector?: (element: T) => number, context?: any): number {
        throw new Error("Method not implemented.");
    }
    public MaxBy<TKey>(keySelector: (element: T, context?: any) => TKey): T {
        throw new Error("Method not implemented.");
    }
    public MinBy<TKey>(keySelector: (element: T, context?: any) => TKey): T {
        throw new Error("Method not implemented.");
    }
    public Sum(selector?: (element: T, context?: any) => number): number {
        throw new Error("Method not implemented.");
    }
    public Last(predicate?: (element: T, index?: number) => boolean, context?: any): T {
        this.checkArray();
        var qwe = this._reverseArray(this.array);
        for (const source of qwe) {
            if (!predicate)
                return source;
            if (predicate(source)) {
                return source;
            }
        }
        throw new InvalidOperationError("No math")
    }
    public LastOrDefault(predicate?: (element: T, index: number) => boolean, defaultValue?: T, context?: any): T {
        this.checkArray();
        try {
            return this.Where(predicate, context).First(null, context);
        }
        catch (e) {
            return defaultValue;
        }
    }
    public Take<TResult>(count: number): TResult[] {
        throw new Error("Method not implemented.");
    }

    public Select<TResult>(selector: (element: T, index: number) => TResult, context?: any): this {
        this.checkArray();
        var arr = [];
        var l = this.array.length;
        for (var i = 0; i < l; i++)
            arr.push(selector.call(this.getContext(context), this.array[i], i, this.array));
        this.array = arr;
        return this;
    }

    public First(predicate?: (element: T, index?: number) => boolean, context?: any): T {
        this.checkArray();

        for (const source of this.array) {
            if (!predicate)
                return source;

            if (predicate(source)) {
                return source;
            }
        }
        throw new InvalidOperationError("No math")
    }
    public FirstOrDefault(predicate?: (element: T, index: number) => boolean, def?: T, context?: any): T {
        this.checkArray();
        try {
            return this.Where(predicate, context).First(null, context);
        }
        catch (e) {
            return def;
        }
    }

    public Where(predicate: (element: T, index: number) => boolean, context?: any): this {
        this.checkArray();
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
        this.checkArray();
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

    private checkArray() {
        if (!this.array)
            throw new ReferenceError("ArgumentUndefinedError(array)");
    }

    private _reverseArray(arr: Array<T>): Array<T> {
        var arr2 = [];
        for (var i = arr.length; i--;) {
            arr2.push(arr[i]);
        };
        return arr2;
    }
}
declare global {

    interface Array<T> {
        Select<TResult>(selector: (element: T, index: number) => TResult, context?: any): TResult[];
        Where(predicate: (element: T, index: number) => boolean, context?: any): T[];
        Any(predicate?: (element: T) => boolean, context?: any): boolean;
        All(predicate: (element: T) => boolean, context?: any): boolean;
        IsEmpty(): boolean;
        Max(selector?: (element: T) => number, context?: any): number;
        Min(selector?: (element: T) => number, context?: any): number;
        MaxBy<TKey>(keySelector: (element: T, context?: any) => TKey): T;
        MinBy<TKey>(keySelector: (element: T, context?: any) => TKey): T;
        Sum(selector?: (element: T, context?: any) => number): number;
        First(predicate?: (element: T, index: number) => boolean, context?: any): T;
        FirstOrDefault(predicate?: (element: T, index: number) => boolean, defaultValue?: T, context?: any): T;
        Last(predicate?: (element: T, index?: number) => boolean, context?: any): T;
        LastOrDefault(predicate?: (element: T, index: number) => boolean, defaultValue?: T, context?: any): T;
        Take<TResult>(count: number): TResult[];
    }
}

export { Enumerable, InvalidOperationError, IEnumerable }