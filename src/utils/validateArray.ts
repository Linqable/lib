export default <T>(array: Array<T>) => {
    if (array === undefined || array == null)
        throw new ReferenceError("argument 'array' is undefined.");
}