declare module "Enumerable" {
    class InvalidOperationError extends Error {
    }
    interface IEnumerable<T> {
        Select<TResult>(selector: (element: T, index: number) => TResult, context?: any): this;
        Where(predicate: (element: T, index: number) => boolean, context?: any): this;
        Any(predicate?: (element: T) => boolean, context?: any): boolean;
        All(predicate: (element: T) => boolean, context?: any): boolean;
        IsEmpty(): boolean;
        Max(selector?: (element: T) => number, context?: any): number;
        Min(selector?: (element: T) => number, context?: any): number;
        MaxBy<TKey>(keySelector: (element: T, context?: any) => TKey): T;
        MinBy<TKey>(keySelector: (element: T, context?: any) => TKey): T;
        Sum(selector?: (element: T, context?: any) => number): number;
        First(predicate?: (element: T, index: number) => boolean, context?: any): T;
        FirstOrDefault(predicate?: (element: T, index: number) => boolean, defaultValue?: T, context?: any): T;
        Last(predicate?: (element: T, index?: number) => boolean, context?: any): T;
        LastOrDefault(predicate?: (element: T, index: number) => boolean, defaultValue?: T, context?: any): T;
        Take<TResult>(count: number): TResult[];
    }
    class Enumerable<T> implements IEnumerable<T> {
        private array;
        private window;
        constructor(arr: Array<T>);
        IsEmpty(): boolean;
        All(predicate: (element: T) => boolean, context?: any): boolean;
        Max(selector?: (element: T) => number, context?: any): number;
        Min(selector?: (element: T) => number, context?: any): number;
        MaxBy<TKey>(keySelector: (element: T, context?: any) => TKey): T;
        MinBy<TKey>(keySelector: (element: T, context?: any) => TKey): T;
        Sum(selector?: (element: T, context?: any) => number): number;
        Last(predicate?: (element: T, index?: number) => boolean, context?: any): T;
        LastOrDefault(predicate?: (element: T, index: number) => boolean, defaultValue?: T, context?: any): T;
        Take<TResult>(count: number): TResult[];
        Select<TResult>(selector: (element: T, index: number) => TResult, context?: any): this;
        First(predicate?: (element: T, index?: number) => boolean, context?: any): T;
        FirstOrDefault(predicate?: (element: T, index: number) => boolean, def?: T, context?: any): T;
        Where(predicate: (element: T, index: number) => boolean, context?: any): this;
        Any(predicate?: (element: T) => boolean, context?: any): boolean;
        ToArray(): Array<T>;
        private getContext(context?);
        private static EqualityComparer(a, b);
        private static SortComparer(a, b);
        private Predicate();
        private checkArray();
        private _reverseArray(arr);
    }
    global  {
        interface Array<T> {
            Select<TResult>(selector: (element: T, index: number) => TResult, context?: any): TResult[];
            Where(predicate: (element: T, index: number) => boolean, context?: any): T[];
            Any(predicate?: (element: T) => boolean, context?: any): boolean;
            All(predicate: (element: T) => boolean, context?: any): boolean;
            IsEmpty(): boolean;
            Max(selector?: (element: T) => number, context?: any): number;
            Min(selector?: (element: T) => number, context?: any): number;
            MaxBy<TKey>(keySelector: (element: T, context?: any) => TKey): T;
            MinBy<TKey>(keySelector: (element: T, context?: any) => TKey): T;
            Sum(selector?: (element: T, context?: any) => number): number;
            First(predicate?: (element: T, index: number) => boolean, context?: any): T;
            FirstOrDefault(predicate?: (element: T, index: number) => boolean, defaultValue?: T, context?: any): T;
            Last(predicate?: (element: T, index?: number) => boolean, context?: any): T;
            LastOrDefault(predicate?: (element: T, index: number) => boolean, defaultValue?: T, context?: any): T;
            Take<TResult>(count: number): TResult[];
        }
    }
    export { Enumerable, InvalidOperationError, IEnumerable };
}
declare module "linq" {
    import "Enumerable";
}
