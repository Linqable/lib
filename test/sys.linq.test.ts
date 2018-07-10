import test from 'ava';
import "./../src/reflection/Reflector"
class tt {
    constructor() { eval("1 + 1"); }
    public v1() { }
    public p1: any;
}
test("GetName", (t) => {
    t.plan(5);
    let obj = new tt();
    let obj2 = new Function("");
    let obj3 = {};
    let obj4 = "a";
    let obj5 = 1;
    t.deepEqual(obj.getReflector().getName(), "<Object>");
    t.deepEqual(obj2.getReflector().getName(), "Function");
    t.deepEqual(obj3.getReflector().getName(), "Object");
    t.deepEqual(obj4.getReflector().getName(), "String");
    t.deepEqual(obj5.getReflector().getName(), "Number");
});