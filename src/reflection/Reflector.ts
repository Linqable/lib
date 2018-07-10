export class Reflector {
    constructor(private obj: object) { }

    public getName(): string {
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec((this.obj).constructor.toString());
        return (results && results.length > 1) ? results[1] : "<Object>";
    }
}

declare global {
    interface Object {
        getReflector(): Reflector;
    }
}
Object.prototype.getReflector = function () {
    return new Reflector(this);
};