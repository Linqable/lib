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
    validateArray(array);
    if (isUsePureJS()) {
        const arr = [];
        for (let i = 0; i < array.length; i++) {
            if (!array[i]) continue;
            // optimize v8 call
            if ((void 0, Reflect.apply)(predicate, array, [array[i], i, array]) === true)
                arr.push(array[i]);
        }
        return arr;
    }
    else return array.filter(predicate, array);
}