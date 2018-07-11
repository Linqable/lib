

/*
    linable.ts (C) 2018 Yuuki Wesp - under MIT license
    by using MoreLINQ (https://github.com/morelinq/MoreLINQ) Jonathan Skeet
*/


import { AdvancedLinqable } from "./AdvancedLinqable";
import { BaseLinqable } from "./Base/BaseLinqable";
import { IComparer } from "./Base/IComparer";
import { InvalidOperationError, ArgumentOutOfRangeError, ArgumentNullError, EvaluateOperationError } from "./error";
import select from "./core/select";

((Enumerable) => { //! WARNING & TODO: optimizations prototype check
    if (typeof Array.prototype.ToQuery !== 'function') {
        Array.prototype.ToQuery = function <T>(): AdvancedLinqable<T> {
            return new AdvancedLinqable(this);
        };
    }
    if (typeof Array.prototype.Where !== 'function') {
        Array.prototype.Where = function <T>(predicate: any, context?: any): T[] {
            return <T[]>new Enumerable(this).Where(predicate, context);
        };
    }
    if (typeof Array.prototype.Select !== 'function') {
        Array.prototype.Select = function <T>(selector: any, context?: any): T[] {
            return <T[]>select(this, selector);
        };
    }
    if (typeof Array.prototype.Any !== 'function') {
        Array.prototype.Any = function (predicate?: any, context?: any) {
            return new Enumerable(this).Any(predicate, context);
        };
    }
    if (typeof Array.prototype.Except !== 'function') {
        Array.prototype.Except = function <T>(arr: Array<T> | number, comparer?: (x: T, y: T) => boolean) {
            return new Enumerable(this).Except(arr, comparer);
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
})(AdvancedLinqable);


export {
    AdvancedLinqable,
    IComparer,
    InvalidOperationError,
    ArgumentOutOfRangeError,
    ArgumentNullError,
    EvaluateOperationError,
    BaseLinqable
};