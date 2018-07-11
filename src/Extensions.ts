

/*
    linable.ts (C) 2018 Yuuki Wesp - under MIT license
    by using MoreLINQ (https://github.com/morelinq/MoreLINQ) Jonathan Skeet
*/


import { AdvancedLinqable } from "./AdvancedLinqable";
import { BaseLinqable } from "./Base/BaseLinqable";
import { IComparer } from "./Base/IComparer";
import { InvalidOperationError, ArgumentOutOfRangeError, ArgumentNullError, EvaluateOperationError } from "./error";
import select from "./core/select";
import { aggregateDelegate } from './core/aggregate';

((Enumerable) => { //! WARNING & TODO: optimizations prototype check
    if (typeof Array.prototype.__linq__ !== 'function') {
        Array.prototype.__linq__ = function () {
            return "1.7-*";
        }
        [0].__linq__();
        Array.prototype.ToQuery = function <T>(): AdvancedLinqable<T> {
            return new AdvancedLinqable(this);
        };
        Array.prototype.Aggregate = function <T, TResult>(selector: aggregateDelegate<T, TResult>, seed?: TResult): TResult {
            return new Enumerable(this).Aggregate(selector, seed);
        };
        Array.prototype.Where = function <T>(predicate: any, context?: any): T[] {
            return <T[]>new Enumerable(this).Where(predicate, context);
        };
        Array.prototype.Select = function <T>(selector: any, context?: any): T[] {
            return <T[]>select(this, selector);
        };
        Array.prototype.Any = function (predicate?: any, context?: any) {
            return new Enumerable(this).Any(predicate, context);
        };
        Array.prototype.Except = function <T>(arr: Array<T> | number, comparer?: (x: T, y: T) => boolean) {
            return new Enumerable(this).Except(arr, comparer);
        };
        Array.prototype.First = function <T>(selector?: any, context?: any) {
            return new Enumerable(this).First(selector, context);
        };
        Array.prototype.FirstOrDefault = function (predicate?: any, def?: any, context?: any) {
            return new Enumerable(this).FirstOrDefault(predicate, def, context);
        };
        Array.prototype.Last = function <T>(selector?: any, context?: any) {
            return new Enumerable(this).Last(selector, context);
        };
        Array.prototype.LastOrDefault = function (predicate?: any, def?: any, context?: any) {
            return new Enumerable(this).LastOrDefault(predicate, def, context);
        };
        Array.prototype.All = function (predicate?: any, context?: any) {
            return new Enumerable(this).All(predicate, context);
        };
        Array.prototype.Sum = function (selector?: any, context?: any) {
            return new Enumerable(this).Sum(selector, context);
        };
        Array.prototype.Min = function (selector?: any) {
            return new Enumerable(this).Min(selector);
        };
        Array.prototype.Max = function (selector?: any) {
            return new Enumerable(this).Max(selector);
        };
        Array.prototype.MaxBy = function (selector?: any) {
            return new Enumerable(this).MaxBy(selector);
        };
        Array.prototype.MinBy = function (selector?: any) {
            return new Enumerable(this).MinBy(selector);
        };
        Array.prototype.IsEmpty = function () {
            return new Enumerable(this).IsEmpty();
        };
        Array.prototype.Take = function (count) {
            return new Enumerable(this).Take(count);
        };
        Array.prototype.Acquire = function () {
            return new Enumerable(this).Acquire();
        };
        Array.prototype.AtLeast = function (c) {
            return new Enumerable(this).AtLeast(c);
        };
        Array.prototype.AtMost = function (c) {
            return new Enumerable(this).AtMost(c);
        };
        Array.prototype.Batch = function (size, selector) {
            return new Enumerable(this).Batch(size, selector);
        };
        Array.prototype.Consume = function () {
            return new Enumerable(this).Consume();
        };
        Array.prototype.OrderByDescending = function (selector, comp) {
            return new Enumerable(this).OrderByDescending(selector, comp);
        };
        Array.prototype.OrderBy = function (selector, comp) {
            return new Enumerable(this).OrderBy(selector, comp);
        };
        Array.prototype.ThenByDescending = function (selector, comp) {
            return new Enumerable(this).ThenByDescending(selector, comp);
        };
        Array.prototype.ThenBy = function (selector, comp) {
            return new Enumerable(this).ThenBy(selector, comp);
        };
        Array.prototype.Reverse = function () {
            return new Enumerable(this).Reverse();
        };
        Array.prototype.SelectMany = function (q, w) {
            return new Enumerable(this).SelectMany(q, w);
        };
        Array.prototype.Count = function (s) {
            return new Enumerable(this).Count(s);
        };
        Array.prototype.Union = function (s) {
            return new Enumerable(this).Union(s);
        };
        Array.prototype.Contains = function (s, q) {
            return new Enumerable(this).Contains(s, q);
        };
        Array.prototype.Distinct = function (s) {
            return new Enumerable(this).Distinct(s);
        };
        Array.prototype.Single = function () {
            return new Enumerable(this).Single();
        };
        Array.prototype.SingleOrDefault = function (def) {
            return new Enumerable(this).SingleOrDefault(def);
        };
        Array.prototype.Zip = function (x, y) {
            return new Enumerable(this).Zip(x, y);
        };
        Array.prototype.ToArray = function () {
            return new Enumerable(this).ToArray();
        };
        Array.prototype.Exclude = function (x, y) {
            return new Enumerable(this).Exclude(x, y);
        };
        Array.prototype.Lag = function (x, y, z) {
            return new Enumerable(this).Lag(x, y, z);
        };
        Array.prototype.Pipe = function (x) {
            return new Enumerable(this).Pipe(x);
        };
        Array.prototype.Flatten = function (x) {
            return new Enumerable(this).Flatten(x);
        };
        Array.prototype.Pairwise = function (x) {
            return new Enumerable(this).Pairwise(x);
        };
        Array.prototype.Evaluate = function () {
            return new Enumerable(this).Evaluate();
        };
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