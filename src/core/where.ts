// -===================================- //
// -= Copyright (c) 2018 Yuuki Wesp   =- //
// -= Licensed under the MIT License. =- //
// -===================================- //

import isUsePureJS from "../utils/isUsePureJS";
import validateArray from "../utils/validateArray";



export type whereDelegate<T> = (element: T, index?: number) => boolean;

/**
 * Filters a sequence of values based on a predicate.
 * @author Yuuki Wesp
 * @public @static @method Where
 * @version 1.7.10
 */
export default <T>(array: Array<T>, predicate: whereDelegate<T>): T[] => {
    'use opt';
    validateArray(array);
    if (isUsePureJS()) {
        const arr = [];
        for (let i = 0; i < array.length; i++) {
            if (!array[i]) continue;
            '%opt-v8-call';
            let val = (void 0, Reflect.apply)(predicate, array, [array[i], i, array]);
            if (val == true)
                arr.push(array[i]);
        }
        return arr;
    }
    else return array.filter(predicate, array);
}