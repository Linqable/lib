import "./../build/Extensions";
import "./../build/AdvancedLinqable";
import test from 'ava';
import { AdvancedLinqable } from "./../build/AdvancedLinqable";
import { linqData } from "./etc/Data";



test("MaxBy", (t) => {
    t.deepEqual(linqData.MaxBy(x => x.age).name, "Willem Kumesh");
});

test("MinBy", (t) => {
    t.deepEqual(linqData.MinBy(x => x.age).name, "Chtholly Nola");
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
    t.plan(2);
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    t.throws(() => {
        arr.Lag(-10, 0,(val, lagVal) => val);
    }, "offset <= 0");
    let result = arr.Lag(2, 0, (a, b) => { return { A: a, B: b}; })
    t.deepEqual(10, result.Count());
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


test("Flatten", (t)=>{
    var source = 
    [
        1, 2,
        [3,[ 4, "foo"], 5, true],
        "bar",
        6,
        [7, 8, 9, 10]
    ];
    t.deepEqual(source.Flatten(), [1,2,3,4,"foo",5,true,"bar",6,7,8,9,10]);
});

test("Pairwise", (t) => {
    t.deepEqual([123, 456, 789].Pairwise(function(x,y) {return {x, y}}), [{x:123,y:456},{x:456,y:789}]);
})
