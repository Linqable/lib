import test from 'ava';
import "./../build/Reflection/Reflector"
class tt {
    constructor() { eval("1 + 1"); }
    public v1() { }
    public p1: any;
}

test("GetName", (t) => {
    let obj = new tt();
    t.deepEqual(obj.getReflector().getName(), "tt");
});