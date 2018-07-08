export interface IComparer<T> {
    Compare(y: T): number;
}