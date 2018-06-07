import { Contextable } from './Contexteable';
import { LinqArrayIterable } from './Iterable';
export abstract class Queryable<T> extends Contextable
{
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
        try
        {
            return a.valueOf() === b.valueOf();
        }
        catch(e) { console.log(a, b, "failed") }
        return false;
    }
    protected SortComparer(a: any, b: any): number {
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


    public GetIterator(): LinqArrayIterable<T>
    {
        return new LinqArrayIterable(this.array);
    }

    protected IteratorToArray<TResult>(iter: IterableIterator<TResult>): TResult[] // TODO
    {
        let result = [];
        while(true)
        {
            let item = iter.next();
            if(item.done)
                break;
            result.push(item.value);
        }
        return result;
    }
}