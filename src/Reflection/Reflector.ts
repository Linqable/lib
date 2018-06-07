export class Reflector
{
    constructor(private obj: object)
    {}

    public getName(): string{
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec((this.obj).constructor.toString());
        return (results && results.length > 1) ? results[1] : "<Object>";
    }
    public InstanceOf<T>(TCreator: { new (): T; })
    {
        let t: T = new TCreator();
        for(let i in Object.getOwnPropertyNames(t))
        {
            if(this.obj.hasOwnProperty(i))
                return true;
        }
        return false;
    }
    public getOwnPropertyNames(): Array<string>
    {
        return Object.getOwnPropertyNames(this.obj);
    }
}

declare global
{
    interface Object
    {
        getReflector(): Reflector;
    }
}
Object.prototype.getReflector = function() { 
    return new Reflector(this);
};