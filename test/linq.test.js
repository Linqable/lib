"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./../dist/linqts");
var chai_1 = require("chai");
var linqData = [];
linqData.push({ name: "Chtholly Nola", age: 17, workPlace: "Soldier", gender: "female", IsDead: true, birthdate: new Date(1203, 6, 12) });
linqData.push({ name: "Willem Kumesh", age: 321, workPlace: "Soldier", gender: "male", IsDead: false, birthdate: new Date(899, 3, 25) });
linqData.push({ name: "Almaria Dufna", age: 19, workPlace: "Student", gender: "female", IsDead: true, birthdate: new Date(902, 12, 3) });
linqData.push({ name: "Nephren Ruq", age: 17, workPlace: "Soldier", gender: "female", IsDead: false, birthdate: new Date(1203, 5, 22) });
linqData.push({ name: "Ithea Myse", age: 18, workPlace: "Soldier", gender: "female", IsDead: false, birthdate: new Date(1204, 1, 14) });
linqData.push({ name: "Ebon Candle", age: Infinity, workPlace: "God", gender: "male", IsDead: false, birthdate: undefined });
linqData.push({ name: "Limeskin", age: 83, workPlace: "Officer", gender: "male", IsDead: false, birthdate: new Date(1137, 4, 4) });
linqData.push({ name: "Nygglatho", age: 21, workPlace: "Caretaker", gender: "female", IsDead: false, birthdate: new Date(1199, 1, 27) });
describe("Select", function () {
    it("Select names", function () {
        chai_1.assert.equal(linqData.Select(function (x) { return x.name; }).length, 8);
    });
});
describe("Where", function () {
    it("Where all dead", function () {
        chai_1.assert.equal(linqData.Where(function (x) { return x.IsDead; }).length, 2);
    });
    it("Where all adult", function () {
        chai_1.assert.equal(linqData.Where(function (x) { return x.age >= 18; }).length, 6);
    });
    it("Where all female adult", function () {
        chai_1.assert.equal(linqData.Where(function (x) { return x.age >= 18 && x.gender == "female"; }).length, 3);
    });
    it("Where all female soldier adult", function () {
        chai_1.assert.equal(linqData.Where(function (x) { return x.age >= 18 && x.gender == "female" && x.workPlace == "Soldier"; }).length, 1);
    });
    it("Where all XXII century", function () {
        chai_1.assert.equal(linqData.Where(function (x) { return x.birthdate.getFullYear() > 1100 && x.birthdate.getFullYear() < 1200; }).length, 2);
    });
});
describe("Any", function () {
    it("Any dead", function () {
        chai_1.assert.isTrue(linqData.Any(function (x) { return x.IsDead; }));
    });
    it("Where all adult", function () {
        chai_1.assert.equal(linqData.Where(function (x) { return x.age >= 18; }).length, 6);
    });
    it("Where all female adult", function () {
        chai_1.assert.equal(linqData.Where(function (x) { return x.age >= 18 && x.gender == "female"; }).length, 3);
    });
    it("Where all female soldier adult", function () {
        chai_1.assert.equal(linqData.Where(function (x) { return x.age >= 18 && x.gender == "female" && x.workPlace == "Soldier"; }).length, 1);
    });
    it("Where all XXII century", function () {
        chai_1.assert.equal(linqData.Where(function (x) { return x.birthdate.getFullYear() > 1100 && x.birthdate.getFullYear() < 1200; }).length, 2);
    });
});
