

/*
    linable.ts (C) 2018 Yuuki Wesp - under MIT license
    by using MoreLINQ (https://github.com/morelinq/MoreLINQ) Jonathan Skeet
*/


import { AdvancedLinqable } from "./AdvancedLinqable";
import { BaseLinqable } from "./Base/BaseLinqable";
import { IComparer } from "./Interfaces/IComparer";
import { IStandardLinq } from "./Interfaces/IStandardLinq";
import { InvalidOperationError, ArgumentOutOfRangeError, ArgumentNullError, EvaluateOperationError } from "./Error";
export {
    AdvancedLinqable,
    IComparer,
    InvalidOperationError,
    ArgumentOutOfRangeError,
    ArgumentNullError,
    EvaluateOperationError,
    IStandardLinq,
    BaseLinqable
};
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
        Aggregate(selector: (el1: any, el2: any) => any, seed?: any): any;
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
    }
}

(() => {
    var Enumerable = require("./AdvancedLinqable").AdvancedLinqable;
    if (typeof Array.prototype.Where !== 'function') {
        Array.prototype.Where = function <T>(predicate: any, context?: any): T[] {
            return <T[]>new Enumerable(this).Where(predicate, context);
        };
    }
    if (typeof Array.prototype.Select !== 'function') {
        Array.prototype.Select = function <T>(selector: any, context?: any): T[] {
            return <T[]>new Enumerable(this).Select(selector, context);
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
    if (typeof Array.prototype.Acquire !== 'function') {
        Array.prototype.Acquire = function () {
            return new Enumerable(this).Acquire();
        };
    }
    if (typeof Array.prototype.AtLeast !== 'function') {
        Array.prototype.AtLeast = function (c) {
            return new Enumerable(this).AtLeast(c);
        };
    }
    if (typeof Array.prototype.AtMost !== 'function') {
        Array.prototype.AtMost = function (c) {
            return new Enumerable(this).AtMost(c);
        };
    }
    if (typeof Array.prototype.Batch !== 'function') {
        Array.prototype.Batch = function (size, selector) {
            return new Enumerable(this).Batch(size, selector);
        };
    }
    if (typeof Array.prototype.Consume !== 'function') {
        Array.prototype.Consume = function () {
            return new Enumerable(this).Consume();
        };
    }
    if (typeof Array.prototype.OrderByDescending !== 'function') {
        Array.prototype.OrderByDescending = function (selector, comp) {
            return new Enumerable(this).OrderByDescending(selector, comp);
        };
    }
    if (typeof Array.prototype.OrderBy !== 'function') {
        Array.prototype.OrderBy = function (selector, comp) {
            return new Enumerable(this).OrderBy(selector, comp);
        };
    }
    if (typeof Array.prototype.ThenByDescending !== 'function') {
        Array.prototype.ThenByDescending = function (selector, comp) {
            return new Enumerable(this).ThenByDescending(selector, comp);
        };
    }
    if (typeof Array.prototype.ThenBy !== 'function') {
        Array.prototype.ThenBy = function (selector, comp) {
            return new Enumerable(this).ThenBy(selector, comp);
        };
    }
    if (typeof Array.prototype.Reverse !== 'function') {
        Array.prototype.Reverse = function () {
            return new Enumerable(this).Reverse();
        };
    }
    if (typeof Array.prototype.SelectMany !== 'function') {
        Array.prototype.SelectMany = function (q, w) {
            return new Enumerable(this).SelectMany(q, w);
        };
    }
    if (typeof Array.prototype.Count !== 'function') {
        Array.prototype.Count = function (s) {
            return new Enumerable(this).Count(s);
        };
    }
    if (typeof Array.prototype.Union !== 'function') {
        Array.prototype.Union = function (s) {
            return new Enumerable(this).Union(s);
        };
    }
    if (typeof Array.prototype.Distinct !== 'function') {
        Array.prototype.Distinct = function (s) {
            return new Enumerable(this).Distinct(s);
        };
    }
    if (typeof Array.prototype.Contains !== 'function') {
        Array.prototype.Contains = function (s, q) {
            return new Enumerable(this).Contains(s, q);
        };
    }
    if (typeof Array.prototype.Distinct !== 'function') {
        Array.prototype.Distinct = function (s) {
            return new Enumerable(this).Distinct(s);
        };
    }
    if (typeof Array.prototype.Single !== 'function') {
        Array.prototype.Single = function () {
            return new Enumerable(this).Single();
        };
    }
    if (typeof Array.prototype.SingleOrDefault !== 'function') {
        Array.prototype.SingleOrDefault = function (def) {
            return new Enumerable(this).SingleOrDefault(def);
        };
    }
    if (typeof Array.prototype.Zip !== 'function') {
        Array.prototype.Zip = function (x, y) {
            return new Enumerable(this).Zip(x, y);
        };
    }
    if (typeof Array.prototype.ToArray !== 'function') {
        Array.prototype.ToArray = function () {
            return new Enumerable(this).ToArray();
        };
    }
    if (typeof Array.prototype.Exclude !== 'function') {
        Array.prototype.Exclude = function (x, y) {
            return new Enumerable(this).Exclude(x, y);
        };
    }
    if (typeof Array.prototype.Lag !== 'function') {
        Array.prototype.Lag = function (x, y, z) {
            return new Enumerable(this).Lag(x, y, z);
        };
    }
    if (typeof Array.prototype.Pipe !== 'function') {
        Array.prototype.Pipe = function (x) {
            return new Enumerable(this).Pipe(x);
        };
    }
    if (typeof Array.prototype.Flatten !== 'function') {
        Array.prototype.Flatten = function (x) {
            return new Enumerable(this).Flatten(x);
        };
    }
    if (typeof Array.prototype.Pairwise !== 'function') {
        Array.prototype.Pairwise = function (x) {
            return new Enumerable(this).Pairwise(x);
        };
    }
    if (typeof Array.prototype.Evaluate !== 'function') {
        Array.prototype.Evaluate = function () {
            return new Enumerable(this).Evaluate();
        };
    }
    if (typeof Array.prototype.Transpose !== 'function') {
        Array.prototype.Transpose = function () {
            return new Enumerable(this).Transpose();
        };
    }
})();