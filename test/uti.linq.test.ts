import test from 'ava';
import isUsePureJS from '../src/utils/isUsePureJS';
import validateArray from '../src/utils/validateArray';


test("is use pure js", (t) => {
    t.plan(2);
    delete process.env.USE_PURE_JS;
    t.false(isUsePureJS());
    process.env.USE_PURE_JS = "true";
    t.true(isUsePureJS());
    delete process.env.USE_PURE_JS;
});

test("validate array", (t) => {
    t.plan(2);
    t.throws(() => {
        validateArray(undefined);
    }, "argument 'array' is undefined.");
    t.notThrows(() => {
        validateArray([]);;
    })
});