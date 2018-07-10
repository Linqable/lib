import test from 'ava';
import { LinqArrayIterable } from '../src/Base/iterable';

//LinqArrayIterable

test("Linq Iterable", (t) => {
    t.plan(7);
    var iter: LinqArrayIterable<number> = null;

    t.notThrows(() => {
        iter = new LinqArrayIterable<number>([1, 2, 3, 4, 5], "num-iter");
    });

    t.deepEqual(iter.toString(), "(Array)num-iter [0]");
    let index = 1;
    for (let num of iter) {
        t.deepEqual(num, index++);
    }
});