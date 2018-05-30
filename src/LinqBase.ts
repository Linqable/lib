export class LinqBase {
    public static EqualityComparer(a: any, b: any): boolean {
        return a === b || a.valueOf() === b.valueOf();
    }
    public static SortComparer(a: any, b: any): number {
        if (a === b) return 0;
        if (a === null) return -1;
        if (b === null) return 1;
        if (typeof a == 'string')
            return a.toString().localeCompare(b.toString());
        return a.valueOf() - b.valueOf();
    }
    public static Predicate() {
        return true;
    }
    public static Selector(selector: any) {
        return selector;
    }
}