export class EvaluateOperationError extends Error {
    constructor(public inneric: Error, msg?: string) {
        super(msg);
    }
}