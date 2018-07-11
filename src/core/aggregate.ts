// -===================================- //
// -= Copyright (c) 2018 Yuuki Wesp   =- //
// -= Licensed under the MIT License. =- //
// -===================================- //

import validateArray from "../utils/validateArray";
import call from "../utils/call";

export type aggregateDelegate<T, TResult> = (el1: T, el2: T) => TResult;
/**
 * Applies an accumulator function over a sequence.
 * @author Yuuki Wesp
 * @version 1.7.10
 * @throws ReferenceError - array is undefined.
 * @public @static @method Aggregate
 */
export default <T, TResult>(array: T[], selector: aggregateDelegate<T, TResult>, seed?: TResult): TResult => {
    validateArray(array);
    var arr = array.slice(0);
    if (seed == null || seed == undefined)
        seed = arr.shift() as any as TResult;
    for (var i = 0; i < array.length; i++)
        seed = call(Reflect.apply, selector, array, [seed as any as T, arr[i]]);
    return seed;
}