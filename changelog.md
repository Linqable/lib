
## 1.7.11

#### Improvement:   

Prepare fixes nyc reports


#### Changes:

Move error classes to error folder  
Move obsolete classes and interfaces to base folder    

## 1.7.10

#### Improvement:
Prepare fixes nyc reports

#### Changes:

Move any, where, select to external module  
Move array declaration from Extensions.ts to index.ts   



## 1.7.9 & 1.7.9-1

Fixes markdown :(


## 1.7.8

Optimization... more optimization!!!


#### Improvement:
Added flag `USE_PURE_JS` to use functions on pure JS code.  

#### Features:
Added function ToQuery (from Array object) which returns the AdvancedLinqable context to avoid disabling optimization due to (deoptimization, reason: prototype check)  
Some features have improved call speed (optimizer v8 call)  
Added web-compatible linqable.js version. (in build/web/linqable.min.js)    
Added CDN(web version) to docs   

#### Changes:
The Where and Select functions now use native functions.map and filter  
Now old logic of where and Select functions is called only with the `USE_PURE_JS` flag  
Some functions have no dependency on the data context.  


## 1.7.7

Started changelog! ✨


#### Improvement:
Added jsdocs to advanced linq api from typescript typing

#### Changes:
Added new function Transpose
```
Transposes a sequence of rows into a sequence of columns.
```
