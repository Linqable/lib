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
3. AVA 1.0.0-beta.6 or above (in global)

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

<details>
<summary>Advanced API</summary>
**Advanced API**

#### Evaluate  
Returns a sequence containing the values resulting from invoking (in order) each function in the source sequence of functions.

```TypeScript
let array = [() => "Chtholly", () => "Ithea", () => 1 + 1, () => !true]

/* ... */

array.Evaluate(); // => ["Chtholly", "Ithea", 2, false]
```

#### Acquire
Ensures that a source sequence of objects are all acquired successfully. 
If the acquisition of any one fails then those successfully acquired till that point are delete

```TypeScript
let array = [{name: "Chtholly Nola", age: 17}, { name: "Ithea Myse", age: 18 }]

/* ... */

array.Acquire(); // => success // => [{name: "Chtholly Nola", age: 17}, { name: "Ithea Myse", age: 18 }]
array.Acquire(); // => fail // => [] // => throw
```

#### Consume
Completely consumes the given sequence. 
This method uses immediate execution, and doesn't store any data during execution

```TypeScript
let array = [{name: "Chtholly Nola", age: 17}, { name: "Ithea Myse", age: 18 }]

/* ... */

array.Comsume();
```

#### Batch
Batches the source sequence into sized buckets.

```TypeScript
let array = [{name: "Chtholly Nola"}, 
             {name: "Nephren Ruq"}, 
             {name: "Almaria Dufna"}, 
             {name: "Ithea Myse"}]

/* ... */

array.Batch(2); // => [[{name: "Chtholly Nola"}, {name: "Nephren Ruq"}],[{name: "Almaria Dufna"}, {name: "Ithea Myse"}]]
// Returns an array with 2 arrays 😏
```

#### MaxBy
Returns the maxima (maximal elements) of the given sequence, based on the given projection. 
```TypeScript
let array = [{name: "Chtholly Nola", age: 17}, { name: "Ithea Myse", age: 18 }]

/* ... */

array.MaxBy(x => x.age) // => { name: "Ithea Myse", age: 18 }
```

#### MinBy
Returns the minima (minimal elements) of the given sequence, based on the given projection. 
```TypeScript
let array = [{name: "Chtholly Nola", age: 17}, { name: "Ithea Myse", age: 18 }]

/* ... */

array.MinBy(x => x.age) // => {name: "Chtholly Nola", age: 17}
```

#### Exclude
Excludes elements from a sequence starting at a given index
```TypeScript
let array = ["CO2", "Ir2O", "C2O3", "NH3", "C2H6", "H2C03"]

/* ... */

array.Exclude(1, 2) // -> ["CO2", "NH3", "C2H6", "H2C03"]
```

#### Flatten
Flattens a sequence containing arbitrarily-nested sequences.
```TypeScript
let array = ["CO2", ["C2O3", ["NH3", 127.4], 241, "H2C03"]

/* ... */

array.Flatten() // -> ["CO2", "C2O3", "NH3", 127.4, 241, "H2C03"]
```


#### Pairwise
Returns a sequence resulting from applying a function to each element in the source sequence and its predecessor, with the exception of the first element which is only returned as the predecessor of the second element
```TypeScript
let array = ["atom", "core", "neutron"];

/* ... */

array.Pairwise((x, y) => `${x} contains ${y}`) // -> ["atom contains core", "core contains neutron"]
```

#### Pipe
Executes the given action on each element in the source sequence and yields it
```TypeScript
let array = [{name: 'neutron', lifetime: 880}, {name: "proton", lifetime: Infinity}]

/* ... */

array.Pipe(x => x.lifetime++);
array.Where(x => x.name == "neutron").lifetime // -> 881
```

#### Lag
Produces a projection of a sequence by evaluating pairs of elements separated by a negative offset.
```TypeScript
let array = [0, 1, 2, 3, 4];

/* ... */

array.Lag(/*step*/2, /*defaultValue*/0, (a, b) => { return { A: a, B: b}; })
//returned -> [{"A":0,"B":0},{"A":1,"B":0},{"A":2,"B":0},{"A":3,"B":1},{"A":4,"B":2}]
```


</details>

<details>
<summary>Standard API</summary>

</details>

<details>
<summary>Road Map</summary>

</details>  

### License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2F0xF6%2Flinq.ts.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2F0xF6%2Flinq.ts?ref=badge_large)
