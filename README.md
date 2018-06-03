# linqable.ts 💥
LINQ 💥 implementation library for TypeScript ❄️


### Dependences 🔥
1. Yarn 1.7 or above
2. TypeScript 2.6 or above (in global)
3. AVA 1.0.0-beta.5 or above (in global)
4. Webpack 3.1.0 or above (in global)


### Build ☄️
1. `yarn build`
2. You are great! 💫

### Test 🍒
1. `yarn test`
2. ava write test-report to screen

![image](https://user-images.githubusercontent.com/13326808/40882212-7d39d292-66e3-11e8-9869-c6c644dd1262.png)


### Usage 🌱


#### [First]OrDefault
Returns the first element of a sequence.   (Predicate Support)
```TypeScript
let array = [{formula: "CeO2", MolarMass: 172.115 }, {formula: "O", MolarMass: 15.999 }];

/* ... */

array.First() -> {formula: "CeO2", MolarMass: 172.115 }

let defaultValue = {formula: "H", MollarMass: 14.1 }
[].FirstOrDefault(null, defaultValue) -> {formula: "H", MollarMass: 14.1 }
```

#### [Last]OrDefault
Returns the last element of a sequence. (Predicate Support)
```TypeScript
let array = [{formula: "CeO2", MolarMass: 172.115 }, {formula: "O", MolarMass: 15.999 }];

/* ... */

array.Last() ->  {formula: "O", MolarMass: 15.999 }

let defaultValue = {formula: "H", MollarMass: 14.1 }
[].LastOrDefault(null, defaultValue) -> {formula: "H", MollarMass: 14.1 }
```

#### Select
Projects each element of a sequence into a new form.  
```TypeScript
let array = [{name: "Chtholly Nola", age: 17}, { name: "Nephren Ruq", age: 17}]

/* ... */

array.Select(x => x.name.split(' ').First()) -> [{name: "Chtholly"}, {"Nephren"}]
```


#### Where
Filters a sequence of values based on a predicate.
```TypeScript
let array = [{name: "Chtholly Nola", age: 17}, 
             {name: "Nephren Ruq", age: 17}, 
             {name: "Almaria Dufna", age: 19}, 
             {name: "Ithea Myse", age: 18}]

/* ... */
// where adult only 🙈
array.Where(x => x.age >= 18) -> [ {name: "Almaria Dufna", age: 19}, {name: "Ithea Myse", age: 18}]
```


#### Any
Determines whether any element of a sequence exists or satisfies a condition.     
```TypeScript
let array = [{name: "Chtholly Nola", IsDead: true}, 
             {name: "Nephren Ruq", IsDead: false}, 
             {name: "Almaria Dufna", IsDead: true}, 
             {name: "Ithea Myse", IsDead: true}]
/* ... */


array.Any(x => x.IsDead) -> true
array.Where(x => !x.IsDead).Any(x => x.IsDead) -> false
```

#### All
Determines whether all elements of a sequence satisfy a condition.
```TypeScript
let array = [{name: "Chtholly Nola", IsDead: true}, 
             {name: "Nephren Ruq", IsDead: false}, 
             {name: "Almaria Dufna", IsDead: true}, 
             {name: "Ithea Myse", IsDead: true}]
/* ... */


array.All(x => x.IsDead) -> false
array.Where(x => x.IsDead).All(x => x.IsDead) -> true
```

#### Sum
Computes the sum of the sequence of Decimal values that are obtained by invoking a transform function on each element of the input sequence.  
```TypeScript
let array1 = [1, 2, 3];
let array2 = [{num: 15}, {num: 10}];

/* ... */

array1.Sum() -> 6
array2.Sim(x => x.num) -> 25
```


#### IsEmpty
Gets a value indicating whether this array contains no elemets.   
```TypeScript
let array1 = [];
let array2 = ["Cobalt","Mithril"];

/* ... */

array1.IsEmpty() -> true
array2.IsEmpty() -> false
```


#### MaxBy
Returns the maxima (maximal elements) of the given sequence, based on the given projection. 
```TypeScript
let array = [{name: "Chtholly Nola", age: 17}, { nname: "Ithea Myse", age: 18 }]

/* ... */

array.MaxBy(x => x.age) -> { nname: "Ithea Myse", age: 18 }
```

#### MinBy
Returns the minima (minimal elements) of the given sequence, based on the given projection. 
```TypeScript
let array = [{name: "Chtholly Nola", age: 17}, { nname: "Ithea Myse", age: 18 }]

/* ... */

array.MinBy(x => x.age) -> {name: "Chtholly Nola", age: 17}
```

#### Min
Invokes a transform function on each element of a sequence and returns the minimum number value.  
```TypeScript
let array = [{name: "Chtholly Nola", age: 17}, { nname: "Ithea Myse", age: 18 }]

/* ... */

array.Min(x => x.age) -> 17
```

#### Max
Invokes a transform function on each element of a sequence and returns the maximum number value.
```TypeScript
let array = [{name: "Chtholly Nola", age: 17}, { nname: "Ithea Myse", age: 18 }]

/* ... */

array.Max(x => x.age) -> 18
```

#### Take 
Returns a specified number of contiguous elements from the start of a sequence.   
```TypeScript
let array = ["Cobalt","Mithril","Adamantium"];

/* ... */

array.Take(2) -> ["Cobalt","Mithril"]
```


### RoadMap
#### Standard: 
- [x] First
- [x] FirstOrDefault
- [x] Last
- [x] LastOrDefault
- [x] Select
- [ ] SelectMany
- [x] Where
- [x] Any
- [x] All
- [x] Sum
- [x] Take
- [ ] TakeWhile
- [x] Min & Max
- [x] MinBy & MaxBy
- [x] IsDefault
- [ ] OrderBy
- [ ] Range
- [ ] Reverse
- [ ] Single
- [ ] SingleOrDefault
- [ ] SkipWhile 
- [ ] ThenBy
- [ ] ThenByDescending
- [x] ToArray
- [ ] Union
- [ ] Zip
- [ ] Aggregate
- [ ] Count
- [ ] Average
- [ ] Append
- [ ] Contains
- [ ] DefaultIfEmpty
- [ ] Distinct
- [ ] Except
- [ ] GroupBy
- [ ] GroupJoin
- [ ] Join
#### Advanced:
- [ ] Acquire
- [ ] AggregateRight
- [ ] Assert
- [ ] AssertCount
- [ ] AtLeast
- [ ] AtMost
- [ ] Backsert
- [ ] Batch
- [ ] Cartesian 
- [ ] Choose
- [ ] Concat
- [ ] Consume
- [ ] CountBetween & CountBy & CountDown & CompareCount
- [ ] EndsWith
- [ ] EquiZip
- [ ] DistinctBy
- [ ] Exactly
- [ ] ExceptBy
- [ ] Exclude
- [ ] FallbackIfEmpty
- [ ] FillBackward & FillForward
- [ ] Flatten
- [ ] Fold
- [ ] From
- [ ] FullGroupJoin
- [ ] FullJoin
- [ ] Generate & GenerateByIndex
- [ ] GroupAdjacent
- [ ] Index
- [ ] Insert
- [ ] Interleave
- [ ] Lag
- [ ] Lead
- [ ] LeftJoin
- [ ] Move
- [ ] OrderedMerge
- [ ] Pad & PadStart
- [ ] Pairwise
- [ ] PartialSort & PartialSortBy
- [ ] Partition
- [ ] Permutations
- [ ] Pipe
- [ ] Prepend
- [ ] PreScan
- [ ] Random & RandomDouble & RandomSubset
- [ ] Rank & RankBy
- [ ] Repeat
- [ ] RightJoin
- [ ] RunLengthEncode
- [ ] Scan & ScanRight
- [ ] Segment
- [ ] Sequence
- [ ] Shuffle
- [ ] SkipLast & SkipUntil
- [ ] Slice
- [ ] SortedMerge
- [ ] Split
- [ ] StartsWith
- [ ] Subsets
- [ ] TagFirstLast
- [ ] TakeEvery & TakeLast & TakeUntil
- [ ] ZipLongest & ZipShortest

### License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2F0xF6%2Flinq.ts.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2F0xF6%2Flinq.ts?ref=badge_large)
