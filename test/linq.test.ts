import "./../dist/linqts";
import test from 'ava';
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
/*
describe("Any", function () {
    it("Any dead", function () {
        assert.isTrue(linqData.Any(x => x.IsDead));
    });
    it("Where all adult", function () {
        assert.equal(linqData.Where(x => x.age >= 18).length, 6);
    });
    it("Where all female adult", function () {
        assert.equal(linqData.Where(x => x.age >= 18 && x.gender == "female").length, 3);
    });
    it("Where all female soldier adult", function () {
        assert.equal(linqData.Where(x => x.age >= 18 && x.gender == "female" && x.workPlace == "Soldier").length, 1);
    });
    it("Where all XXII century", function () {
        assert.equal(linqData.Where(x => x.birthdate.getFullYear() > 1100 && x.birthdate.getFullYear() < 1200).length, 2);
    });
});*/