
declare global {

    interface Array<T> {
        /* ... Standard API ... */

        Reverse(): T[];
        ToArray(): Array<T>;

        Single(): T;
        SingleOrDefault(defaultValue: T): T;
        Except(arr: Array<T> | number, comparer?: (x: T, y: T) => boolean): any[];
        Zip<T3, T4>(arr: Array<T4>, selector: (x: T, y: T4) => T3): T3[]
        Union(arr: Array<T>): T[];
        Distinct(comparer?: (x: T, y: T) => boolean): Array<T>;
        Contains(el: T, comparer?: (x: T, y: T) => boolean): boolean;
        Count(predicate?: (element: T, index?: number) => boolean): number;
        IsEmpty(): boolean;
        All(predicate: (element: T) => boolean, context?: any): boolean;
        Max(selector?: (element: T) => number): number;
        Min(selector?: (element: T) => number): number;
        MaxBy(selector: (element: T) => number): T;
        MinBy(selector: (element: T) => number): T;
        Sum(selector?: (element: T) => number, context?: any): number;
        Last(predicate?: (element: T, index?: number) => boolean, context?: any): T;
        LastOrDefault(predicate?: (element: T, index: number) => boolean, defaultValue?: T, context?: any): T;
        Take(count: number): T[];
        Select<TResult>(selector: (element: T, index: number) => TResult, context?: any): TResult[];
        First(predicate?: (element: T, index?: number) => boolean, context?: any): T;
        FirstOrDefault(predicate?: (element: T, index: number) => boolean, def?: T, context?: any): T;
        Where(predicate: (element: T, index?: number) => boolean, context?: any): T[];
        Any(predicate?: (element: T) => boolean, context?: any): boolean;
        SelectMany<TCollection, TResult>(colSelector: (element: T, index?: number) => TCollection[], resSelector: (outer: T, inner: TCollection) => TResult): Array<TResult>;
        ThenBy<TResult>(selector: (element: T) => TResult, Comparer?: (a: TResult, b: TResult) => number): T[];
        ThenByDescending<TResult>(selector: (element: T) => TResult, Comparer?: (a: TResult, b: TResult) => number): T[];
        OrderBy<TResult>(selector?: (element: T) => TResult, Comparer?: (a: TResult, b: TResult) => number): T[];
        OrderByDescending<TResult>(selector?: (element: T) => TResult, Comparer?: (a: TResult, b: TResult) => number): T[];
        Aggregate<TResult>(selector: aggregateDelegate<T, TResult>, seed?: TResult): TResult;
        /* ... Advanced API ... */

        /**
        * Ensures that a source sequence of objects are all acquired successfully.
        * If the acquisition of any one fails then those successfully acquired till that point are disposed
        */
        Acquire(): T[];
        /**
         * Determines whether or not the number of elements in the sequence is greater than or equal to the given integer.
         */
        AtLeast(count: number): boolean;
        /**
         * Determines whether or not the number of elements in the sequence is lesser than or equal to the given integer.
         */
        AtMost(count: number): boolean;
        /**
         * Batches the source sequence into sized buckets and applies a projection to each bucket.
         */
        Batch(size: number, resultSelector?: (arr: Array<T>) => Array<T>): Array<T[]>
        /**
         * Completely consumes the given sequence.
         * This method uses immediate execution, and doesn't store any data during execution
         */
        Consume(): void
        /**
         * Excludes a contiguous number of elements from a sequence starting
         * at a given index.
         * @param startIndex The zero-based index at which to begin excluding elements
         * @param count The number of elements to exclude
         */
        Exclude(startIndex: number, count: number): T[];
        /**
        * Produces a projection of a sequence by evaluating pairs of elements separated by a negative offset.
        * @param offset The offset (expressed as a positive number) by which to lag each value of the sequence
        * @param defaultValue A default value supplied for the lagged value prior to the lag offset
        * @param selector A projection function which accepts the current and lagged items (in that order) and returns a result
        */
        Lag<TResult>(offset: number, defaultValue: T, selector: (x: T, y: T) => TResult): TResult[];
        /**
         * Executes the given action on each element in the source sequence
         * @param act The action to execute on each element
         */
        Pipe(act: (x: T) => void): T[];
        /**
         * Flattens a sequence containing arbitrarily-nested sequences.
         */
        Flatten(predicate?: (arr: Array<{}>) => boolean): {}[];
        /**
         * Returns a sequence resulting from applying a function to each
         * element in the source sequence and its
         * predecessor, with the exception of the first element which is
         * only returned as the predecessor of the second element.
         * @param selector transform function to apply to each pair of sequence.
         */
        Pairwise<TResult>(selector: (x: T, y: T) => TResult): TResult[];
        /**
         * Returns a sequence containing the values resulting from invoking (in order) each function in the source sequence of functions.
         */
        Evaluate(): Array<any>;
        /**
         * Transposes a sequence of rows into a sequence of columns.
         * @returns Returns a sequence of columns in the source swapped into rows.
         */
        Transpose<T>(): T[][];




        ToQuery<T>(): AdvancedLinqable<T>;
    }
}
import "./Extensions";
import { AdvancedLinqable } from "./AdvancedLinqable";
import { aggregateDelegate } from "./core/aggregate";
