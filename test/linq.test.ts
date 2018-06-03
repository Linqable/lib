import "./../dist/Extensions";
import "./../dist/Enumerable";
import test from 'ava';
import { Enumerable } from "./../dist/Enumerable";
var linqData: Array<{
    name: string,
    age: number,
    workPlace: "Soldier" | "Student" | "God" | "Officer" | "Caretaker",
    gender: "male" | "female",
    IsDead: boolean,
    birthdate: Date
}> = [];
// 1220 year
linqData.push({ name: "Chtholly Nola", age: 17, workPlace: "Soldier", gender: "female", IsDead: true, birthdate: new Date(1203, 6, 12) });
linqData.push({ name: "Willem Kumesh", age: 321, workPlace: "Soldier", gender: "male", IsDead: false, birthdate: new Date(899, 3, 25) });
linqData.push({ name: "Almaria Dufna", age: 19, workPlace: "Student", gender: "female", IsDead: true, birthdate: new Date(902, 12, 3) });
linqData.push({ name: "Nephren Ruq", age: 17, workPlace: "Soldier", gender: "female", IsDead: false, birthdate: new Date(1203, 5, 22) });
linqData.push({ name: "Ithea Myse", age: 18, workPlace: "Soldier", gender: "female", IsDead: false, birthdate: new Date(1204, 1, 14) });
linqData.push({ name: "Ebon Candle", age: Infinity, workPlace: "God", gender: "male", IsDead: false, birthdate: undefined });
linqData.push({ name: "Limeskin", age: 83, workPlace: "Officer", gender: "male", IsDead: false, birthdate: new Date(1137, 4, 4) });
linqData.push({ name: "Nygglatho", age: 21, workPlace: "Caretaker", gender: "female", IsDead: false, birthdate: new Date(1199, 1, 27) });

test('Select names', t => {
    t.deepEqual(linqData.Select(x => x.name).length, 8);
});
test("Where all dead", (t) => {
    t.deepEqual(linqData.Where(x => x.IsDead).length, 2);
});
test("Where all adult", (t) => {
    t.deepEqual(linqData.Where(x => x.IsDead).length, 2);
});
test("Where all female adult", (t) => {
    t.deepEqual(linqData.Where(x => x.age >= 18 && x.gender == "female").length, 3);
});
test("Where all female soldier adult", (t) => {
    t.deepEqual(linqData.Where(x => x.age >= 18 && x.gender == "female" && x.workPlace == "Soldier").length, 1);
});
test("Where all XXII century", (t) => {
    t.deepEqual(linqData.Where(x => x.birthdate.getFullYear() > 1100 && x.birthdate.getFullYear() < 1200).length, 2);
});
test("Any dead", (t) => {
    t.true(linqData.Any(x => x.IsDead));
});
test("First - (Empty predicate)", (t) => {
    t.deepEqual(linqData.First().name, "Chtholly Nola");
});
test("First - Willem", (t) => {
    t.deepEqual(linqData.First(x => x.age == 321).name, "Willem Kumesh");
});

test("First - Throw Error No Math", (t) => {
    t.throws(() => {
        [].First(x => x.age == 321);
    }, "No math");
});


test("FirstOrDefault", (t) => {
    t.deepEqual(linqData.FirstOrDefault(x => x.age == 1, {
        name: "Lia Watermah",
        age: 1839,
        workPlace: "God",
        birthdate: undefined,
        gender: "female",
        IsDead: true
    }).name, "Lia Watermah");
});


test("LastOrDefault", (t) => {
    t.deepEqual(linqData.LastOrDefault(x => x.age == 1, {
        name: "Lia Watermah",
        age: 1839,
        workPlace: "God",
        birthdate: undefined,
        gender: "female",
        IsDead: true
    }).name, "Lia Watermah");
});


test("Last - Nygglatho", (t) => {
    t.deepEqual(linqData.Last().name, "Nygglatho");
});


test("All dead", (t) => {
    t.true(linqData.Where(x => x.IsDead).All(x => x.IsDead));
});
test("All Not dead", (t) => {
    t.false(linqData.Where(x => !x.IsDead).All(x => x.IsDead));
});

test("Sum ages", (t) => {
    t.deepEqual(linqData.Sum(x => x.age), 496);
});

test("Throw Sum InvalidOperation", (t) => {
    t.throws(() => {
        linqData.Sum(x => <number><any>x.birthdate);
    }, "Element is not number.");
});

test("Max", (t) => {
    t.deepEqual(linqData.Max(x => x.age), 321);
});

test("Min", (t) => {
    t.deepEqual(linqData.Min(x => x.age), 17);
});

test("MaxBy", (t) => {
    t.deepEqual(linqData.MaxBy(x => x.age).name, "Willem Kumesh");
});

test("MinBy", (t) => {
    t.deepEqual(linqData.MinBy(x => x.age).name, "Chtholly Nola");
});

test("IsEmpty", (t) => {
    t.true(linqData.Where(x => x.age == 9).IsEmpty());
});


test("Take", (t) => {
    t.deepEqual(linqData.Take(1).length, 1);
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