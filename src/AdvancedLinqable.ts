import { InvalidOperationError, ArgumentOutOfRangeError, ArgumentNullError } from "./Error";
import { BaseLinqable } from './Base/BaseLinqable';
import { LinqArrayIterable } from './Base/Iterable';
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
    public Batch(size: number, resultSelector?: (arr: Array<T>) => Array<T>): Array<T[]> {
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
        return this.IteratorToArray(generator());
    }
    /**
     * Completely consumes the given sequence. 
     * This method uses immediate execution, and doesn't store any data during execution
     */
    public Consume(): void {
        this.checkArray();
        for (let element of this.array) { }
    }
    /**
     * Excludes a contiguous number of elements from a sequence starting
     * at a given index.
     * @param startIndex The zero-based index at which to begin excluding elements
     * @param count The number of elements to exclude
     */
    public Exclude(startIndex: number, count: number): T[]
    {
        this.checkArray();
        if (startIndex < 0) throw new ArgumentOutOfRangeError();
        if (count < 0) throw new ArgumentOutOfRangeError();
        if (count == 0) return this.array;
        let iter = this.GetIterator();
        
        let generator = function* () {
            let index = -1;
            let endIndex = startIndex + count;
            while (iter.next() && ++index < startIndex)
                yield iter.getCurrent();
            while (++index < endIndex && iter.next())
                continue;
            while (iter.next())
                yield iter.getCurrent();
        }
        return this.IteratorToArray(generator());
    }
    /**
     * Produces a projection of a sequence by evaluating pairs of elements separated by a negative offset.
     * @param offset The offset (expressed as a positive number) by which to lag each value of the sequence
     * @param defaultValue A default value supplied for the lagged value prior to the lag offset
     * @param selector A projection function which accepts the current and lagged items (in that order) and returns a result
     */
    public Lag<TResult>(offset: number, defaultValue: T, selector: (x:T, y: T) => TResult): TResult[]
    {
        this.checkArray();
        if (!selector) throw new ArgumentNullError("Selector is undefined.");
        if (offset <= 0) throw new ArgumentOutOfRangeError("offset <= 0");
        let that = this;
        let generator = function* ()
        {
            var i = offset;
            var lagQueue = new Array<T>(offset);
            var hasMore = true;
            let iter = that.GetIterator();
            console.log("iter "+ JSON.stringify(iter));
            while (i-- > 0 && (hasMore = iter.moveNext()))
            {
                lagQueue.push(iter.getCurrent());
                console.log("iter.getCurrent() " +JSON.stringify(iter.getCurrent()));
                yield selector(iter.getCurrent(), defaultValue);
            }
            if (hasMore)
            {
                while (iter.moveNext())
                {
                    var lagValue = lagQueue.shift();
                    console.log("lagValue " +JSON.stringify(lagValue));
                    yield selector(iter.getCurrent(), lagValue);
                    lagQueue.push(iter.getCurrent());
                }
            }
        }
        return this.IteratorToArray(generator());
    }
    /**
     * Executes the given action on each element in the source sequence
     * @param act The action to execute on each element
     */
    public Pipe(act: (x:T) => void): T[]
    {
        this.checkArray();
        if (!act) throw new ArgumentNullError("act is undefined.");
        let that = this;
        let generator = function*()
        {
            for(let element of that.array)
            {
                act(element);
                yield element;
            }
        }
        return this.IteratorToArray(generator());
    }
    /**
     * Flattens a sequence containing arbitrarily-nested sequences.
     */
    public Flatten(predicate: (arr: Array<{}>) => boolean)
    {
        this.checkArray();
        if (!predicate) throw new ArgumentNullError("Predicate is undefined.");
        let that = this;
        let generator = function*()
        {
            let iter = that.GetIterator();
            let stack: Array<LinqArrayIterable<{}>> = [];

            stack.push(iter);
            try
            {
                while (stack.Any())
                {
                    let iter = stack.pop();

                    let loop = function*() {
                        while (iter.moveNext())
                        {
                            if (iter.getCurrent() instanceof Array && predicate(<Array<{}>><any>iter.getCurrent()))
                            {
                                stack.push(iter);
                                iter = new AdvancedLinqable((<Array<{}>>iter.getCurrent())).GetIterator();
                                loop();
                            }
                            else
                            yield iter.getCurrent();
                        }
                    }
                    yield loop();
                    iter = null; // 'delete' is denied is strict mode
                }
            }
            finally
            {
                iter = null;
            }
        }
        return this.IteratorToArray(generator());
    }
    /**
     * Returns a sequence resulting from applying a function to each
     * element in the source sequence and its
     * predecessor, with the exception of the first element which is
     * only returned as the predecessor of the second element.
     * @param selector transform function to apply to each pair of sequence.
     */
    public Pairwise<TResult>(selector: (x:T, y:T) => TResult): TResult[]
    {
        this.checkArray();
        if (!selector) throw new ArgumentNullError("Selector is undefined.");
        let that = this;
        let generator = function*()
        {
            let iter = that.GetIterator();
            if (!iter.moveNext())
                return;
            let previous = iter.getCurrent();
            while (iter.moveNext())
            {
                yield selector(previous, iter.getCurrent());
                previous = iter.getCurrent();
            }
        }
        return this.IteratorToArray(generator());
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

