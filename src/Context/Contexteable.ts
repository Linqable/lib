export abstract class Contextable
{
    private window: any;
    protected getContext(context?: any): any {
        var global: any = global;
        if (typeof (window) === 'undefined') {
            this.window = global;
        } else {
            this.window = window || global;
        }
        return context || this.window;
    }
}