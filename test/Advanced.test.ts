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
