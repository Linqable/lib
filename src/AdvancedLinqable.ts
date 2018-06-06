import { InvalidOperationError } from "./Error";
import { BaseLinqable } from './Base/BaseLinqable';
export class AdvancedLinqable<T> extends BaseLinqable<T> {
    constructor(arr: Array<T>) {
        super(arr);
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



    protected QuantityIterator<T>(source: ArrayLike<T>, limit: number, min: number, max: number): boolean {
        if (source == null) {
            throw new Error("ArgumentNullError");
        }
        let col: Array<T>
        let num = ((col = (source as Array<T>)) != null) ? col.length : limit;
        return num >= min && num <= max;
    }
}

