import "./../Reflection/Reflector";
export class LinqArrayIterable<T> implements IterableIterator<T> {

  private pointer = 0;

  constructor(public items: T[] = [], public name: string = "<iterator>") { }

  public next(): IteratorResult<T> {
    if (this.pointer < this.items.length) {
      return {
        done: false,
        value: this.items[this.pointer++]
      }
    }
    else return { done: true, value: null }
  }
  public moveNext(): boolean {
    if (this.pointer < this.items.length) {
      this.pointer++;
      return true;
    }
    else false;
  }
  [Symbol.iterator](): IterableIterator<T> {
    return this;
  }
  public getCurrent(): T {
    return this.items[this.pointer - 1];
  }

  public toString(): string {
    return `(${this.items.getReflector().getName()})${this.name} [${this.pointer}]`;
  }
}