<!--
 * @Author: yunmin
 * @Email: 362279869@qq.com
 * @Date: 2021-08-20 23:31:41
-->
A utility module which provides convenient functions for applications developed with [Node.js](https://nodejs.org/)      
        
## Installation      

```javascript
npm install exp-utils
```

import exp-utils module
```javascript
const {
    utils,
    eventSystem,
    cryptoSystem,
    cmdSystem,
    ...
} = require('exp-utils');
```

cmdSystem use case
```javascript
    // add command
    cmdSystem.add("-i", function(next) {
        console.log("doing otherthing, input...");
        ...
        utils.invoke(next, "next action: output");
    });
    cmdSystem.add("-o", function(next) {
        console.log("doing something, outpout...");
        ...
        utils.invoke(next);
    }, "output something");
    ...
    // start command
    cmdSystem.start(true);
```

cryptoSystem use case
```javascript
let word = '你好, hello, 안녕하세요, こんにちは...';
// use the default key here
let rt = cryptoSystem.encryptAES256(word);
console.log(rt); // => ...
let is_word = cryptoSystem.decryptAES256(rt);
console.log(is_word); // => ...
console.log(is_word === word); // => true

// generate a unique token
let token = cryptoSystem.tokenGenerate();
```

eventSystem use case
```javascript
// ... file1.js ...
let listener1 = function(age, name){
    console.log('listener(file1) receive: ');
    console.log('age: ' + age);
    console.log('name: ' + name);
};
// add a listener in file1.js
eventSystem.add('event_name', listener1);

// ... file2.js ...
let listener2 = function(age, name){
    console.log('listener(file2) receive: ');
    console.log('age: ' + age);
    console.log('name: ' + name);
};
// add another listener(one-time) in file2.js
eventSystem.once('event_name', listener2);

// ... file3.js ...
// broadcast event in file3.js
console.log('broadcast event(event_name)');
eventSystem.emit('event_name', 26, 'your age');
```
utils use case
```javascript
// is Array|Object|String contain ?
utils.contain([1, 2, 3], 10); // => return false
utils.contain({id: 100}, 'id'); // => return true
utils.contain('i am a test code', 'a test'); // => return true

// delete a value|key in the Array|Object
let arr = [1, 2, 3, 4, 6];
console.log(utils.delete(arr, 3)); // => true
console.log(arr); // => [1, 2, 4, 6]
let obj = {id: 1, name: 'exp-utils', age: 100};
console.log(utils.delete(obj, 'age')); // => true
console.log(obj); // => {id: 1, name: 'exp-utils'}

// disable property enumerable of a object
obj = {id: 1, name: 'exp-utils', age: 100, level: 50};
utils.propertiesEnumerable(obj, ['name']);
console.log(obj.name); // => exp-utils
console.log(obj); // => { id: 1, age: 100, level: 50 }
console.log(JSON.stringify(obj)); // => {"id":1,"age":100,"level":50}

// sort the object array
arr = [{id:1,name:"b1"},{id:18,name:"b18"},{id:9,name:"b9"}];
utils.sortByKey(arr, 'id', true);
console.log(arr); // => [{id:1,name:"b1"},{id:9,name:"b9"},{id:18,name:"b18"}]
utils.sortByKey(arr, 'id', false);
console.log(arr); // => [{id:18,name:"b18"},{id:9,name:"b9"},{id:1,name:"b1"}]
```
