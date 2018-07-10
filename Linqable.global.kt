@file:Suppress("INTERFACE_WITH_SUPERCLASS", "OVERRIDING_FINAL_MEMBER", "RETURN_TYPE_MISMATCH_ON_OVERRIDE", "CONFLICTING_OVERLOADS", "EXTERNAL_DELEGATION", "NESTED_CLASS_IN_EXTERNAL_INTERFACE")
@file:JsQualifier("global")
package global


/**
    Version: 1.7.11
 */

import kotlin.js.*
import kotlin.js.Json
import org.khronos.webgl.*
import org.w3c.dom.*
import org.w3c.dom.events.*
import org.w3c.dom.parsing.*
import org.w3c.dom.svg.*
import org.w3c.dom.url.*
import org.w3c.fetch.*
import org.w3c.files.*
import org.w3c.notifications.*
import org.w3c.performance.*
import org.w3c.workers.*
import org.w3c.xhr.*

external fun <T> Array<T>.Reverse(): Array<T> = definedExternally
external fun <T> Array<T>.ToArray(): Array<T> = definedExternally
external fun <T> Array<T>.Single(): T = definedExternally
external fun <T> Array<T>.SingleOrDefault(defaultValue: T): T = definedExternally
external fun <T> Array<T>.Except(arr: Number, comparer: ((x: T, y: T) -> Boolean)? = definedExternally /* null */): Array<Any> = definedExternally
external fun <T> Array<T>.Except(arr: Array<T>, comparer: ((x: T, y: T) -> Boolean)? = definedExternally /* null */): Array<Any> = definedExternally
external fun <T, T3, T4> Array<T>.Zip(arr: Array<T4>, selector: (x: T, y: T4) -> T3): Array<T3> = definedExternally
external fun <T> Array<T>.Union(arr: Array<T>): Array<T> = definedExternally
external fun <T> Array<T>.Distinct(comparer: ((x: T, y: T) -> Boolean)? = definedExternally /* null */): Array<T> = definedExternally
external fun <T> Array<T>.Contains(el: T, comparer: ((x: T, y: T) -> Boolean)? = definedExternally /* null */): Boolean = definedExternally
external fun <T> Array<T>.Count(predicate: ((element: T, index: Number? /*= null*/) -> Boolean)? = definedExternally /* null */): Number = definedExternally
external fun <T> Array<T>.IsEmpty(): Boolean = definedExternally
external fun <T> Array<T>.All(predicate: (element: T) -> Boolean, context: Any? = definedExternally /* null */): Boolean = definedExternally
external fun <T> Array<T>.Max(selector: ((element: T) -> Number)? = definedExternally /* null */): Number = definedExternally
external fun <T> Array<T>.Min(selector: ((element: T) -> Number)? = definedExternally /* null */): Number = definedExternally
external fun <T> Array<T>.MaxBy(selector: (element: T) -> Number): T = definedExternally
external fun <T> Array<T>.MinBy(selector: (element: T) -> Number): T = definedExternally
external fun <T> Array<T>.Sum(selector: ((element: T) -> Number)? = definedExternally /* null */, context: Any? = definedExternally /* null */): Number = definedExternally
external fun <T> Array<T>.Last(predicate: ((element: T, index: Number? /*= null*/) -> Boolean)? = definedExternally /* null */, context: Any? = definedExternally /* null */): T = definedExternally
external fun <T> Array<T>.LastOrDefault(predicate: ((element: T, index: Number) -> Boolean)? = definedExternally /* null */, defaultValue: T? = definedExternally /* null */, context: Any? = definedExternally /* null */): T = definedExternally
external fun <T> Array<T>.Take(count: Number): Array<T> = definedExternally
external fun <T, TResult> Array<T>.Select(selector: (element: T, index: Number) -> TResult, context: Any? = definedExternally /* null */): Array<TResult> = definedExternally
external fun <T> Array<T>.First(predicate: ((element: T, index: Number? /*= null*/) -> Boolean)? = definedExternally /* null */, context: Any? = definedExternally /* null */): T = definedExternally
external fun <T> Array<T>.FirstOrDefault(predicate: ((element: T, index: Number) -> Boolean)? = definedExternally /* null */, def: T? = definedExternally /* null */, context: Any? = definedExternally /* null */): T = definedExternally
external fun <T> Array<T>.Where(predicate: (element: T, index: Number? /*= null*/) -> Boolean, context: Any? = definedExternally /* null */): Array<T> = definedExternally
external fun <T> Array<T>.Any(predicate: ((element: T) -> Boolean)? = definedExternally /* null */, context: Any? = definedExternally /* null */): Boolean = definedExternally
external fun <T, TCollection, TResult> Array<T>.SelectMany(colSelector: (element: T, index: Number? /*= null*/) -> Array<TCollection>, resSelector: (outer: T, inner: TCollection) -> TResult): Array<TResult> = definedExternally
external fun <T, TResult> Array<T>.ThenBy(selector: (element: T) -> TResult, Comparer: ((a: TResult, b: TResult) -> Number)? = definedExternally /* null */): Array<T> = definedExternally
external fun <T, TResult> Array<T>.ThenByDescending(selector: (element: T) -> TResult, Comparer: ((a: TResult, b: TResult) -> Number)? = definedExternally /* null */): Array<T> = definedExternally
external fun <T, TResult> Array<T>.OrderBy(selector: ((element: T) -> TResult)? = definedExternally /* null */, Comparer: ((a: TResult, b: TResult) -> Number)? = definedExternally /* null */): Array<T> = definedExternally
external fun <T, TResult> Array<T>.OrderByDescending(selector: ((element: T) -> TResult)? = definedExternally /* null */, Comparer: ((a: TResult, b: TResult) -> Number)? = definedExternally /* null */): Array<T> = definedExternally
external fun <T, TResult> Array<T>.Aggregate(selector: aggregateDelegate<T, TResult>, seed: TResult? = definedExternally /* null */): TResult = definedExternally
external fun <T> Array<T>.Acquire(): Array<T> = definedExternally
external fun <T> Array<T>.AtLeast(count: Number): Boolean = definedExternally
external fun <T> Array<T>.AtMost(count: Number): Boolean = definedExternally
external fun <T> Array<T>.Batch(size: Number, resultSelector: ((arr: Array<T>) -> Array<T>)? = definedExternally /* null */): Array<Array<T>> = definedExternally
external fun <T> Array<T>.Consume(): Unit = definedExternally
external fun <T> Array<T>.Exclude(startIndex: Number, count: Number): Array<T> = definedExternally
external fun <T, TResult> Array<T>.Lag(offset: Number, defaultValue: T, selector: (x: T, y: T) -> TResult): Array<TResult> = definedExternally
external fun <T> Array<T>.Pipe(act: (x: T) -> Unit): Array<T> = definedExternally
external fun <T> Array<T>.Flatten(predicate: ((arr: Array<Any>) -> Boolean)? = definedExternally /* null */): Array<Any> = definedExternally
external fun <T, TResult> Array<T>.Pairwise(selector: (x: T, y: T) -> TResult): Array<TResult> = definedExternally
external fun <T> Array<T>.Evaluate(): Array<Any> = definedExternally
external fun <T0, T> Array<T0>.Transpose(): Array<Array<T>> = definedExternally
external fun <T0, T> Array<T0>.ToQuery(): AdvancedLinqable<T> = definedExternally
