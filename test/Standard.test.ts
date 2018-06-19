import "./../src";
import test from 'ava';
import { AdvancedLinqable } from "./../src";
import { linqData } from "./etc/Data";

test("Any", (t) => {
    t.true(linqData.Any(x => x.IsDead));
});
test("All", (t) => {
    t.plan(2);
    t.true(linqData.Where(x => x.IsDead).All(x => x.IsDead));
    t.false(linqData.Where(x => !x.IsDead).All(x => x.IsDead));
});
test('Select', t => {
    t.deepEqual(linqData.Select(x => x.name).length, 8);
});
test("SelectMany", (t) => {
    t.deepEqual(new AdvancedLinqable([{ ar: [1, 2], name: "2" }, { ar: [3, 4], name: "1" }]).SelectMany(x => x.ar, (q, z) => z), [1, 2, 3, 4]);
});
test("Where", (t) => {
    t.plan(5);
    t.deepEqual(linqData.Where(x => x.IsDead).length, 2);
    t.deepEqual(linqData.Where(x => x.IsDead).length, 2);
    t.deepEqual(linqData.Where(x => x.age >= 18 && x.gender == "female").length, 3);
    t.deepEqual(linqData.Where(x => x.age >= 18 && x.gender == "female" && x.workPlace == "Soldier").length, 1);
    t.deepEqual(linqData.Where(x => x.birthdate.getFullYear() > 1100 && x.birthdate.getFullYear() < 1200).length, 2);
});

test("First", (t) => {
    t.plan(3);
    t.deepEqual(linqData.First().name, "Chtholly Nola");
    t.deepEqual(linqData.First(x => x.age == 321).name, "Willem Kumesh");
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


test("Last", (t) => {
    t.deepEqual(linqData.Last().name, "Nygglatho");
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


test("Single", (t) => {
    t.plan(3);
    t.throws(() => {
        [0, 1, 1, 2].Single();
    }, "The input sequence contains more than one element.");
    t.throws(() => {
        [].Single();
    }, "The input sequence is empty.");
    t.deepEqual([1].Single(), 1);
})
test("SingleOrDefault", (t) => {
    t.plan(3);
    t.deepEqual([].SingleOrDefault(1), 1);
    t.deepEqual([2, 3].SingleOrDefault(1), 1);
    t.deepEqual([2].SingleOrDefault(1), 2);
})



test("Sum", (t) => {
    t.plan(2);
    t.deepEqual(linqData.Sum(x => x.age), 496);
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



test("IsEmpty", (t) => {
    t.true(linqData.Where(x => x.age == 9).IsEmpty());
});


test("Take", (t) => {
    t.deepEqual(linqData.Take(1).length, 1);
});


test("OrderBy", (t) => {
    t.plan(4);
    t.deepEqual(linqData.OrderBy(x => x.age).Select(x => x.age), [17, 17, 18, 19, 21, 83, 321, Infinity])
    t.deepEqual(["usb1", "usb3", "usb10", "usb15", "usb4", "usb2"].OrderBy(), ["usb1", "usb2", "usb3", "usb4", "usb10", "usb15"])
    t.deepEqual(linqData.OrderBy(x => x.name).Select(x => x.name), [
        'Almaria Dufna',
        'Chtholly Nola',
        'Ebon Candle',
        'Ithea Myse',
        'Limeskin',
        'Nephren Ruq',
        'Nygglatho',
        'Willem Kumesh',
    ]);
    t.deepEqual(JSON.stringify(linqData.OrderBy(x => x.birthdate)
        .Select(x => x.birthdate ? x.birthdate.toISOString().slice(0, 9).replace(/-/g, "") : x.birthdate)),
        '[null,"0899042","0903010","1137050","1199022","1203062","1203071","1204021"]')
});
test("OrderByDescending", (t) => {
    t.plan(3);
    t.deepEqual(linqData.OrderByDescending(x => x.age).Select(x => x.age), [Infinity, 321, 83, 21, 19, 18, 17, 17])
    t.deepEqual(linqData.OrderByDescending(x => x.name).Select(x => x.name),
        [
            "Willem Kumesh",
            "Nygglatho",
            "Nephren Ruq",
            "Limeskin",
            "Ithea Myse",
            "Ebon Candle",
            "Chtholly Nola",
            "Almaria Dufna"
        ]);
    t.deepEqual(JSON.stringify(linqData.OrderByDescending(x => x.birthdate)
        .Select(x => x.birthdate ? x.birthdate.toISOString().slice(0, 9).replace(/-/g, "") : x.birthdate)),
        '["1204021","1203071","1203062","1199022","1137050","0903010","0899042",null]');
});

test("Count", (t) => {
    t.plan(2);
    t.deepEqual(linqData.Count(), 8)
    t.deepEqual(linqData.Count(x => x.IsDead), 2)
})

test("Contains", (t) => {
    t.plan(2);
    t.false([0, 1, 2].Contains(3))
    t.true([0, 1, 2].Contains(1))
})
test("Distinct", (t) => {
    t.deepEqual([0, 1, 1, 2].Distinct(), [0, 1, 2])
})
test("Union", (t) => {
    var numbers1 = [3, 3, 4, 5, 5];
    var numbers2 = [1, 2, 3];
    t.deepEqual(numbers1.Union(numbers2).OrderBy(), [1, 2, 3, 4, 5])
})
test("Zip", (t) => {
    var letters = ["A", "B", "C", "D", "E"];
    var numbers = [1, 2, 3];
    t.deepEqual(letters.Zip(numbers, (l, n) => l + n.toString()), ["A1", "B2", "C3"])
})

