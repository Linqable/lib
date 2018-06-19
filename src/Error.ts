export class InvalidOperationError extends Error { }
export class ArgumentOutOfRangeError extends Error { }
export class ArgumentNullError extends Error { }
export class EvaluateOperationError extends Error {
    constructor(public inneric: Error, msg?: string) {
        super(msg);
    }
}