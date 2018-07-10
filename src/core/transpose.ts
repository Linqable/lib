// -===================================- //
// -= Copyright (c) 2018 Yuuki Wesp   =- //
// -= Licensed under the MIT License. =- //
// -===================================- //

import isUsePureJS from "../utils/isUsePureJS";
import validateArray from "../utils/validateArray";
import { ArgumentNullError } from "../error";


export default <T>(array: Array<T>): Array<Array<T>> => {
    if (!array) throw new ArgumentNullError("array");
    return undefined;
};