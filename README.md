# linqable.ts 1.7 💥
LINQ 💥 implementation library for TypeScript ❄️

[![NPM](https://nodei.co/npm/linqable.ts.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/linqable.ts/)       

[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/0xF6/linqable.ts.svg?branch=master)](https://travis-ci.org/0xF6/linqable.ts)
[![codecov](https://codecov.io/gh/0xF6/linqable.ts/branch/master/graph/badge.svg)](https://codecov.io/gh/0xF6/linqable.ts) 
![npm](https://img.shields.io/npm/dt/linqable.ts.svg)
![image](https://david-dm.org/0xF6/linqable.ts.svg)


### Dependences 🔥
1. Yarn 1.7 or above
2. TypeScript 2.6 or above (in global)
3. AVA 1.0.0-beta.5 or above (in global)
4. Webpack 3.1.0 or above (in global)

### Install
- `yarn add linqable.ts`
or
- `npm i linqable.ts`

### Build ☄️
1. `yarn build`
2. You are great! 💫

### Test 🍒
1. `yarn test`
2. ava write test-report to screen

![image](https://user-images.githubusercontent.com/13326808/41082352-ad6fe5f4-6a36-11e8-8e51-4d98f0dec746.png)


### Usage 🌱
JS:   
```JavaScript
require("linqable.ts"); // import array extensions

console.log([3,5].Sum());
```
TS:   
```TypeScript
import "linqable.ts";

console.log([3,5].Sum());
```

Use Advanced & Base Linqable:
    
```TypeScript
import { AdvancedLinqable, BaseLinqable } from "linqable.ts";

console.log(new BaseLinqable([3,5]).Sum());
console.log(new AdvancedLinqable([3,5]).Acquire());
```


### API:
<hr/>   

See [WIKI](https://github.com/0xF6/linqable.ts/wiki)



### License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2F0xF6%2Flinq.ts.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2F0xF6%2Flinq.ts?ref=badge_large)
