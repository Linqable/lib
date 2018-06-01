export { }
declare global {
    interface Array<T> {
        Select<TResult>(selector: (element: T, index: number) => TResult, context?: any): TResult[]
        Where<TResult>(predicate: (element: T, index: number) => boolean, context?: any): TResult[]
        Any(predicate?: (element: T) => boolean): boolean;
        All(predicate: (element: T) => boolean): boolean;
        IsEmpty(): boolean;

        Max(selector?: (element: T) => number): number;
        Min(selector?: (element: T) => number): number;
        MaxBy<TKey>(keySelector: (element: T) => TKey): T;
        MinBy<TKey>(keySelector: (element: T) => TKey): T;
        Sum(selector?: (element: T) => number): number;

        First(predicate?: (element: T, index: number) => boolean): T;
        FirstOrDefault(predicate?: (element: T, index: number) => boolean, defaultValue?: T): T;
        Last(predicate?: (element: T, index: number) => boolean): T;
        LastOrDefault(predicate?: (element: T, index: number) => boolean, defaultValue?: T): T;

        Take<TResult>(count: number): TResult[]
    }
}
require("./Enumerable");
require("./Any");
require("./Select");
require("./Where");