import test from 'ava';
import { Reflector } from '../src/reflection/Reflector';
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
    t.deepEqual(new Reflector(obj).getName(), "<Object>");
    t.deepEqual(new Reflector(obj2).getName(), "Function");
    t.deepEqual(new Reflector(obj3).getName(), "Object");
    t.deepEqual(new Reflector(obj4 as any as object).getName(), "String");
    t.deepEqual(new Reflector(obj5 as any as object).getName(), "Number");
});