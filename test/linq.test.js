"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./../dist/linqts");
var ava_1 = require("ava");
var linqData = [];
linqData.push({ name: "Chtholly Nola", age: 17, workPlace: "Soldier", gender: "female", IsDead: true, birthdate: new Date(1203, 6, 12) });
linqData.push({ name: "Willem Kumesh", age: 321, workPlace: "Soldier", gender: "male", IsDead: false, birthdate: new Date(899, 3, 25) });
linqData.push({ name: "Almaria Dufna", age: 19, workPlace: "Student", gender: "female", IsDead: true, birthdate: new Date(902, 12, 3) });
linqData.push({ name: "Nephren Ruq", age: 17, workPlace: "Soldier", gender: "female", IsDead: false, birthdate: new Date(1203, 5, 22) });
linqData.push({ name: "Ithea Myse", age: 18, workPlace: "Soldier", gender: "female", IsDead: false, birthdate: new Date(1204, 1, 14) });
linqData.push({ name: "Ebon Candle", age: Infinity, workPlace: "God", gender: "male", IsDead: false, birthdate: undefined });
linqData.push({ name: "Limeskin", age: 83, workPlace: "Officer", gender: "male", IsDead: false, birthdate: new Date(1137, 4, 4) });
linqData.push({ name: "Nygglatho", age: 21, workPlace: "Caretaker", gender: "female", IsDead: false, birthdate: new Date(1199, 1, 27) });
ava_1.default('Select names', function (t) {
    t.deepEqual(linqData.Select(function (x) { return x.name; }).length, 8);
});
ava_1.default("Where all dead", function (t) {
    t.deepEqual(linqData.Where(function (x) { return x.IsDead; }).length, 2);
});
ava_1.default("Where all adult", function (t) {
    t.deepEqual(linqData.Where(function (x) { return x.IsDead; }).length, 2);
});
ava_1.default("Where all female adult", function (t) {
    t.deepEqual(linqData.Where(function (x) { return x.age >= 18 && x.gender == "female"; }).length, 3);
});
ava_1.default("Where all female soldier adult", function (t) {
    t.deepEqual(linqData.Where(function (x) { return x.age >= 18 && x.gender == "female" && x.workPlace == "Soldier"; }).length, 1);
});
ava_1.default("Where all XXII century", function (t) {
    t.deepEqual(linqData.Where(function (x) { return x.birthdate.getFullYear() > 1100 && x.birthdate.getFullYear() < 1200; }).length, 2);
});
ava_1.default("Any dead", function (t) {
    t.true(linqData.Any(function (x) { return x.IsDead; }));
});
ava_1.default("First - (Empty predicate)", function (t) {
    t.deepEqual(linqData.First().name, "Chtholly Nola");
});
ava_1.default("First - Willem", function (t) {
    t.deepEqual(linqData.First(function (x) { return x.age == 321; }).name, "Willem Kumesh");
});
ava_1.default("First - Throw Error No Math", function (t) {
    t.throws(function () {
        [].First(function (x) { return x.age == 321; });
    }, null, "No math");
});
ava_1.default("FirstOrDefault", function (t) {
    t.deepEqual(linqData.FirstOrDefault(function (x) { return x.age == 1; }, {
        name: "Lia Watermah",
        age: 1839,
        workPlace: "God",
        birthdate: undefined,
        gender: "female",
        IsDead: true
    }).name, "Lia Watermah");
});
ava_1.default("LastOrDefault", function (t) {
    t.deepEqual(linqData.LastOrDefault(function (x) { return x.age == 1; }, {
        name: "Lia Watermah",
        age: 1839,
        workPlace: "God",
        birthdate: undefined,
        gender: "female",
        IsDead: true
    }).name, "Lia Watermah");
});
ava_1.default("Last - Nygglatho", function (t) {
    t.deepEqual(linqData.Last().name, "Nygglatho");
});
ava_1.default("All dead", function (t) {
    t.true(linqData.Where(function (x) { return x.IsDead; }).All(function (x) { return x.IsDead; }));
});
ava_1.default("All Not dead", function (t) {
    t.false([{ x: 1 }, { x: 1 }, { x: 2 }].All(function (x) { return x.x == 1; }));
});
