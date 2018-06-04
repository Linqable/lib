import { InvalidOperationError } from "./Error";

declare global {

    interface Array<T> {
        Select<TResult>(selector: (element: T, index: number) => TResult, context?: any): TResult[];
        Where(predicate: (element: T, index: number) => boolean, context?: any): T[];
        Any(predicate?: (element: T) => boolean, context?: any): boolean;
        All(predicate: (element: T) => boolean, context?: any): boolean;
        IsEmpty(): boolean;
        Max(selector?: (element: T) => number): number;
        Min(selector?: (element: T) => number): number;
        MaxBy(selector: (element: T) => number): T;
        MinBy(selector: (element: T) => number): T;
        Sum(selector?: (element: T) => number, context?: any): number;
        First(predicate?: (element: T, index: number) => boolean, context?: any): T;
        FirstOrDefault(predicate?: (element: T, index: number) => boolean, defaultValue?: T, context?: any): T;
        Last(predicate?: (element: T, index?: number) => boolean, context?: any): T;
        LastOrDefault(predicate?: (element: T, index: number) => boolean, defaultValue?: T, context?: any): T;
        Take(count: number): T[];

        ThenBy<TResult>(selector: (element: T) => TResult, Comparer?: (a: TResult, b: TResult) => number): T[];
        ThenByDescending<TResult>(selector: (element: T) => TResult, Comparer?: (a: TResult, b: TResult) => number): T[];
        OrderBy<TResult>(selector: (element: T) => TResult, Comparer?: (a: TResult, b: TResult) => number): T[];
        OrderByDescending<TResult>(selector: (element: T) => TResult, Comparer?: (a: TResult, b: TResult) => number): T[];

        /* ... Advanced API ... */
        Acquire(): T[];
        AtLeast(count: number): boolean;
        AtMost(count: number): boolean;
        Batch(size: number, resultSelector?: (arr: Array<T>) => Array<T>): IterableIterator<T[]>;
        Consume(): void

    }
}

export class Enumerable<T> {
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
    public Max(selector?: (element: T) => number): number {
        this.checkArray();
        var l = this.array.length;
        if (l == 0)
            return 0;
        selector = selector || <(element: T) => number><any>this.Selector;
        var max = selector(this.array[0]);
        if (typeof max !== "number")
            throw new InvalidOperationError("Element is not number.");
        while (l-- > 0)
            if (selector(this.array[l]) > max && isFinite(selector(this.array[l]))) max = selector(this.array[l]);
        return max;
    }
    public Min(selector?: (element: T) => number): number {
        this.checkArray();
        var l = this.array.length;
        if (l == 0)
            return 0;
        selector = selector || <(element: T) => number><any>this.Selector;
        var min = selector(this.array[0]);
        if (typeof min !== "number")
            throw new InvalidOperationError("Element is not number.");
        while (l-- > 0)
            if (selector(this.array[l]) < min && isFinite(selector(this.array[l]))) min = selector(this.array[l]);
        return min;
    }
    public MaxBy(selector: (element: T) => number): T {
        this.checkArray();
        var l = this.array.length;
        if (l == 0)
            throw new InvalidOperationError("Array Is Empty.");
        selector = selector || <(element: T) => number><any>this.Selector;
        var max = selector(this.array[0]);
        let FindedElement = <T>this.array[0];
        if (typeof max !== "number")
            throw new InvalidOperationError("Element is not number.");
        while (l-- > 0)
            if (selector(this.array[l]) > max && isFinite(selector(this.array[l]))) {
                max = selector(this.array[l]);
                FindedElement = this.array[l];
            }
        return FindedElement;
    }
    public MinBy(selector: (element: T) => number): T {
        this.checkArray();
        var l = this.array.length;
        if (l == 0)
            throw new InvalidOperationError("Array Is Empty.");
        selector = selector || <(element: T) => number><any>this.Selector;
        var min = selector(this.array[0]);
        let FindedElement = <T>this.array[0];
        if (typeof min !== "number")
            throw new InvalidOperationError("Element is not number.");
        while (l-- > 0)
            if (selector(this.array[l]) < min && isFinite(selector(this.array[l]))) {
                min = selector(this.array[l]);
                FindedElement = this.array[l];
            }
        return FindedElement;
    }
    public Sum(selector?: (element: T) => number, context?: any): number {
        this.checkArray();
        let num: number = 0;
        let arr: Array<number>;
        if (selector)
            arr = <Array<number>><any>this.array.Select(selector, context);
        else
            arr = <Array<number>><any>this.array;

        arr.forEach(element => {
            if (typeof element !== "number")
                throw new InvalidOperationError("Element is not number.");
            if (!isFinite(element) || isNaN(element)) { }
            else
                num += element;
        });

        return num;
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
    public Take(count: number): T[] {
        if (!count)
            count = 1;
        return this.array.slice(0, count);
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

    public ThenBy<TResult>(selector: (element: T) => TResult, Comparer?: (a: TResult, b: TResult) => number): T[] {
        this.checkArray();
        Comparer = Comparer || this.SortComparer;
        var arr = this.array.slice(0);
        var fn = (a: T, b: T) => {
            return Comparer(selector(a), selector(b));
        };
        return new Enumerable(arr).OrderBy(this.Selector, function (a, b) {
            var res = fn(a, b);
            return res === 0 ? Comparer(selector(a), selector(b)) : res;
        });
    }
    public ThenByDescending<TResult>(selector: (element: T) => TResult, Comparer?: (a: TResult, b: TResult) => number): T[] {
        this.checkArray();
        Comparer = Comparer || this.SortComparer;
        var arr = this.array.slice(0);
        var fn = (a: T, b: T) => {
            return Comparer(selector(a), selector(b));
        };
        return new Enumerable(arr).OrderBy(this.Selector, function (a, b) {
            var res = fn(a, b);
            return res === 0 ? -Comparer(selector(a), selector(b)) : res;
        });
    }
    public OrderBy<TResult>(selector: (element: T) => TResult, Comparer?: (a: TResult, b: TResult) => number): T[] {
        this.checkArray();
        Comparer = Comparer || this.SortComparer;
        var arr = this.array.slice(0);
        var fn = (a: T, b: T) => {
            return Comparer(selector(a), selector(b));
        };
        return arr.sort(fn);
    }

    public OrderByDescending<TResult>(selector: (element: T) => TResult, Comparer?: (a: TResult, b: TResult) => number): T[] {
        this.checkArray();
        Comparer = Comparer || this.SortComparer;
        var arr = this.array.slice(0);
        var fn = (a: T, b: T) => {
            return -Comparer(selector(a), selector(b));
        };
        return arr.sort(fn);
    }


    public ToArray(): Array<T> {
        if (this.array)
            return this.array;
        else return [];
    }


    /**
     * Ensures that a source sequence of objects are all acquired successfully. 
     * If the acquisition of any one fails then those successfully acquired till that point are disposed
     */
    public Acquire(): T[] {
        let result: T[];
        try {
            result = Array.from(this.array);
        }
        catch (e) {
            for (let i = 0; i != this.array.length; i++) {
                delete this.array[i];
            }
            throw e;
        }
        return result;
    }
    /**
     * Determines whether or not the number of elements in the sequence is greater than or equal to the given integer.
     */
    public AtLeast(count: number): boolean {
        if (count < 0) {
            throw new Error("Count cannot be negative.");
        }
        return this.QuantityIterator<T>(this.array, count, count, Number.MAX_SAFE_INTEGER);
    }
    /**
     * Determines whether or not the number of elements in the sequence is lesser than or equal to the given integer.
     */
    public AtMost(count: number): boolean {
        if (count < 0) {
            throw new Error("Count cannot be negative.");
        }
        return this.QuantityIterator<T>(this.array, count + 1, 0, count);
    }
    /**
     * Batches the source sequence into sized buckets and applies a projection to each bucket.
     */
    public Batch(size: number, resultSelector?: (arr: Array<T>) => Array<T>): IterableIterator<T[]> {
        let source = this.array;
        resultSelector = resultSelector || ((arr: Array<T>) => arr);
        let generator = function* (): IterableIterator<Array<T>> {
            let bucket: T[] = null;
            var count = 0;
            for (var item of source) {
                if (bucket == null) {
                    bucket = new Array<T>(size);
                }
                bucket[count++] = item;
                if (count != size) {
                    continue;
                }
                yield resultSelector(bucket);
                bucket = null;
                count = 0;
            }
            if (bucket != null && count > 0) {
                yield resultSelector(bucket);
            }
        }
        return generator();
    }
    /**
     * Completely consumes the given sequence. 
     * This method uses immediate execution, and doesn't store any data during execution
     */
    public Consume(): void {
        this.checkArray();
        for (let element of this.array) { }
    }



    private QuantityIterator<T>(source: ArrayLike<T>, limit: number, min: number, max: number): boolean {
        if (source == null) {
            throw new Error("ArgumentNullError");
        }
        let col: Array<T>
        let num = ((col = (source as Array<T>)) != null) ? col.length : limit;
        return num >= min && num <= max;
    }

    /* ...................................................... */

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
    private SortComparer(a: any, b: any): number {
        console.log(typeof a);
        console.log(typeof b);
        if (a === b) return 0;
        if (a === null || a === undefined) return -1;
        if (b === null || b === undefined) return 1;
        if (a.hasOwnProperty("Compare"))
            return a.Compare(b);
        if (typeof a == 'string')
            return a.toString().localeCompare(b.toString());
        if (a instanceof Date && b instanceof Date) {
            if (a.getTime() === b.getTime())
                return 0;
            if (a.getTime() <= b.getTime())
                return -1;
            if (a.getTime() >= b.getTime())
                return 1;
        }
        return a.valueOf() - b.valueOf();
    }
    private Predicate(): boolean {
        return true;
    }
    private Selector(e: any): any {
        return e;
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