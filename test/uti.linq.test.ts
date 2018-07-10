import test from 'ava';
import isUsePureJS from '../src/utils/isUsePureJS';
import validateArray from '../src/utils/validateArray';
import select from '../src/core/select';
import transpose from '../src/core/transpose';


test("is", (t) => {
    t.plan(2);
    t.deepEqual(select([1, 2, 3], (x) => x * 2), [2, 4, 6]);
    t.notThrows(() => {
        transpose([]);
    })
});


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