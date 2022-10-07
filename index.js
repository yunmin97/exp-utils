/*
 * @Author: yunmin
 * @Email: 362279869@qq.com
 * @Date: 2020-02-11 22:05:30
 */

const cmdSystem = require('./src/sole/cmdSystem');
const cryptoSystem = require('./src/sole/cryptoSystem');
const eventSystem = require('./src/sole/eventSystem');
const fileSystem = require('./src/sole/fileSystem');
const mysqlPool = require('./src/sole/mysqlPool');
const redisPool = require('./src/sole/redisPool');
const contain = require('./src/contain');
const invoke = require('./src/invoke');
const del = require('./src/delete');
const methodsEnumerable = require('./src/methodsEnumerable');
const propertiesEnumerable = require('./src/propertiesEnumerable');
const sortByKey = require('./src/sortByKey');
const number2String = require('./src/number2String');
const rand = require('./src/rand');
const lottery = require('./src/lottery');
const shuffle = require('./src/shuffle');

// cmd system module
module.exports.cmdSystem = cmdSystem;
// crypto system module
module.exports.cryptoSystem = cryptoSystem;
// event system module
module.exports.eventSystem = eventSystem;
// file system module
module.exports.fileSystem = fileSystem;
// mysql pool module
module.exports.mysqlPool = mysqlPool;
// redis pool module
module.exports.redisPool = redisPool;
// utils module
module.exports.utils = {
    // checks if Array|Object|String is contain a value|key|string
    contain: contain.proxy,
    // invoke the cb if it's a function
    invoke: invoke.proxy,
    // delete a value|key in the Array|Object
    delete: del.proxy,
    // enable/disable methods enumerable of class except excludes(for pomelo ES6 support)
    methodsEnumerable: methodsEnumerable.proxy,
    // enable/disable property enumerable of a object
    propertiesEnumerable: propertiesEnumerable.proxy,
    // sorts the array by object's key in an array
    sortByKey: sortByKey.proxy,
    // Converts a number to a string of the specified length by padding the character before it
    number2String: number2String.proxy,
    // returns a pseudorandom number([min, max)) between min and max
    rand: rand.proxy,
    // play a lottery, return the hit item
    lottery: lottery.proxy,
    // shuffle an array easily
    shuffle: shuffle.proxy,
};
