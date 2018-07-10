export default <T>(array: Array<T>) => {
    if (!array)
        throw new ReferenceError("argument 'array' is undefined.");
}