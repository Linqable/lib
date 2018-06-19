import { Contextable } from '../Context';
import { LinqArrayIterable } from './iterable';
export abstract class Queryable<T> extends Contextable {
    protected array: Array<T>;
    constructor(arr: Array<T>) {
        super();
        this.array = arr;
    }
    public Reverse(): T[] {
        return this._reverseArray(this.array);
    }
    public ToArray(): Array<T> {
        if (this.array)
            return this.array;
        else return [];
    }
    protected EqualityComparer(a: any, b: any): boolean {
        if (a === b) return true;
        if (a === null || a === undefined) return false;
        if (b === null || b === undefined) return false;
        if (typeof a == 'string')
            return a.toString() === b.toString();
        if (a instanceof Date && b instanceof Date) {
            if (a.getTime() === b.getTime())
                return true;
        }
        try {
            return a.valueOf() === b.valueOf();
        }
        catch (e) { console.log(a, b, "failed") }
        return false;
    }
    private static isWhitespace(code) {
        return code <= 32;
    }
    private static isDigit(code) {
        return 48 <= code && code <= 57;
    }
    private static isSign(code) {
        return code === '-'.charCodeAt(0) || code === '+'.charCodeAt(0);
    }
    public static strCompare(a: string, b: string): number {
        var ia = 0;
        var ib = 0;
        var ma = a.length;
        var mb = b.length;
        var ca, cb; // character code
        var za, zb; // leading zero count
        var na, nb; // number length
        var sa, sb; // number sign
        var ta, tb; // temporary
        var bias;
        let zero = '0'.charCodeAt(0);
        let plus = '+'.charCodeAt(0);
        let minus = '-'.charCodeAt(0);
        while (ia < ma && ib < mb) {
            ca = a.charCodeAt(ia);
            cb = b.charCodeAt(ib);
            za = zb = 0;
            na = nb = 0;
            sa = sb = true;
            bias = 0;

            // skip over leading spaces
            while (this.isWhitespace(ca)) {
                ia += 1;
                ca = a.charCodeAt(ia);
            }
            while (this.isWhitespace(cb)) {
                ib += 1;
                cb = b.charCodeAt(ib);
            }

            // compare digits with other symbols
            if (this.isDigit(ca) && !this.isDigit(cb)) return -1;
            if (!this.isDigit(ca) && this.isDigit(cb)) return 1;

            // compare negative and positive
            if (!sa && sb) return -1;
            if (sa && !sb) return 1;

            // count leading zeros
            while (ca === zero) {
                za += 1;
                ia += 1;
                ca = a.charCodeAt(ia);
            }
            while (cb === zero) {
                zb += 1;
                ib += 1;
                cb = b.charCodeAt(ib);
            }

            // count numbers
            while (this.isDigit(ca) || this.isDigit(cb)) {
                if (this.isDigit(ca) && this.isDigit(cb) && bias === 0) {
                    if (sa) {
                        if (ca < cb) bias = -1;
                        else if (ca > cb) bias = 1;
                    }
                    else {
                        if (ca > cb) bias = -1;
                        else if (ca < cb) bias = 1;
                    }
                }
                if (this.isDigit(ca)) {
                    ia += 1;
                    na += 1;
                    ca = a.charCodeAt(ia);
                }
                if (this.isDigit(cb)) {
                    ib += 1;
                    nb += 1;
                    cb = b.charCodeAt(ib);
                }
            }

            // compare number length
            if (sa) {
                if (na < nb) return -1;
                if (na > nb) return 1;
            } else {
                if (na > nb) return -1;
                if (na < nb) return 1;
            }

            // compare numbers
            if (bias) return bias;
            // compare leading zeros
            if (sa) {
                if (za > zb) return -1;
                if (za < zb) return 1;
            } else {
                if (za < zb) return -1;
                if (za > zb) return 1;
            }

            // compare ascii codes
            if (ca < cb) return -1;
            if (ca > cb) return 1;

            ia += 1;
            ib += 1;
        }

        // compare length
        if (ma < mb) return -1;
        if (ma > mb) return 1;
    }
    protected SortComparer(a: any, b: any): number {
        if (a === b) return 0;
        if (a === null || a === undefined) return -1;
        if (b === null || b === undefined) return 1;
        if (a.hasOwnProperty("Compare"))
            return a.Compare(b);
        if (typeof a == 'string') // return a.toString().localeCompare(b.toString());
            return Queryable.strCompare(a, b);
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
    protected Predicate(): boolean {
        return true;
    }
    protected Selector(e: any): any {
        return e;
    }


    protected _reverseArray(arr: Array<T>): Array<T> {
        var arr2 = [];
        for (var i = arr.length; i--;) {
            arr2.push(arr[i]);
        };
        return arr2;
    }


    public GetIterator(): LinqArrayIterable<T> {
        return new LinqArrayIterable(this.array);
    }

    protected IteratorToArray<TResult>(iter: IterableIterator<TResult>): TResult[] // TODO
    {
        let result = [];
        while (true) {
            let item = iter.next();
            if (item.done)
                break;
            result.push(item.value);
        }
        return result;
    }
}