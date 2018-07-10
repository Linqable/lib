// -===================================- //
// -= Copyright (c) 2018 Yuuki Wesp   =- //
// -= Licensed under the MIT License. =- //
// -===================================- //

import isUsePureJS from "../utils/isUsePureJS";
import validateArray from "../utils/validateArray";



export type selectDelegate<T, TResult> = (element: T, index?: number) => TResult;

/**
 * Projects each element of a sequence into a new form.
 * @author Yuuki Wesp
 * @version 1.7.10
 * @throws ReferenceError - array is undefined.
 * @public @static @method Select
 */
export default <T, TResult>(array: Array<T>, selector: selectDelegate<T, TResult>): TResult[] => {
    'use opt';
    validateArray(array);
    if (isUsePureJS()) {
        const arr = [];
        for (var i = 0; i < array.length; i++) {
            '%opt-v8-call';
            let opt = (void 0, Reflect.apply)(selector, array, [array[i], i]);
            arr.push(opt);
        }
        return arr;
    }
    return array.map(selector, array);
}