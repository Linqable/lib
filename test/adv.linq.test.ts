import test from 'ava';
import "./../src";
import { linqData } from "./etc/Data";


test("Transpose", (t) => {
    t.deepEqual([
        [10, 12],
        [20],
        [30, 35, 45]
    ].Transpose(), [[10, 20, 30], [12, 35], [45]]);
});
test("Evaluate", (t) => {
    t.plan(3);
    t.deepEqual([() => true, () => "test", () => 123].Evaluate(), [true, "test", 123]);
    t.throws(() => {
        linqData.Evaluate();
    }, "Array elemetns is not a functions.");
    t.throws(() => {
        [() => true, () => { throw "test" }, () => 123].Evaluate();
    }, "An error occurred in executive element while performing evaluate operation.");
});
test("MaxBy", (t) => {
    t.deepEqual(linqData.MaxBy(x => x.age).name, "Willem Kumesh");
});

test("MinBy", (t) => {
    t.plan(3);
    t.deepEqual(linqData.MinBy(x => x.age).name, "Chtholly Nola");
    t.deepEqual(linqData.Reverse().MinBy(x => x.age).name, "Chtholly Nola");
    t.deepEqual(linqData.Min(x => x.age), 17);
});


test("Batch", (t) => {
    t.plan(3);
    for (let i of linqData.Batch(3))
        t.deepEqual(i.length, 3);
});

test("Consume", (t) => {
    t.notThrows(() => {
        linqData.Consume();
    });
});


test("Lag", (t) => {
    t.plan(4);
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    t.throws(() => {
        arr.Lag(-10, 0, (val, lagVal) => val);
    }, "offset <= 0");
    let result = arr.Lag(2, 0, (a, b) => { return { A: a, B: b }; })
    t.deepEqual(10, result.Count());
    t.true(result.slice(2).All(x => x.B == (x.A - 2)));
    t.true(result.Take(2).All(x => (x.A - x.B) == x.A));
});

test("Exclude", (t) => {
    t.plan(3);
    t.throws(() => {
        linqData.Exclude(-10, 5);
    }, "startIndex is negative.")
    t.throws(() => {
        linqData.Exclude(0, -5);
    }, "count is negative.")

    t.deepEqual(linqData.Exclude(0, linqData.Count() / 2).Count(), linqData.Count() / 2);
})


test("Flatten", (t) => {
    var source =
        [
            1, 2,
            [3, [4, "foo"], 5, true],
            "bar",
            6,
            [7, 8, 9, 10]
        ];
    t.deepEqual(source.Flatten(), [1, 2, 3, 4, "foo", 5, true, "bar", 6, 7, 8, 9, 10]);
});

test("Pairwise", (t) => {
    t.deepEqual([123, 456, 789].Pairwise(function (x, y) { return { x, y } }), [{ x: 123, y: 456 }, { x: 456, y: 789 }]);
})

test("Pipe", (t) => {
    t.plan(3);
    let arr = [{ x: 12 }, { x: 12 }, { x: 12 }];
    arr.Pipe(x => { x.x++; })
    t.deepEqual(arr[0].x, 13);
    t.deepEqual(arr[1].x, 13);
    t.deepEqual(arr[2].x, 13);
})
