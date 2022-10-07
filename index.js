/*
 * @Author: yunmin
 * @Email: 362279869@qq.com
 * @Date: 2020-02-11 22:05:30
 */

const cryptoSystem = require('./exp-utils/sole/cryptoSystem');
const eventSystem = require('./exp-utils/sole/eventSystem');
const fileSystem = require('./exp-utils/sole/fileSystem');
const mysqlPool = require('./exp-utils/sole/mysqlPool');
const redisPool = require('./exp-utils/sole/redisPool');
const contain = require('./exp-utils/contain');
const invoke = require('./exp-utils/invoke');
const del = require('./exp-utils/delete');
const methodsEnumerable = require('./exp-utils/methodsEnumerable');
const propertiesEnumerable = require('./exp-utils/propertiesEnumerable');
const sortByKey = require('./exp-utils/sortByKey');
const number2String = require('./exp-utils/number2String');
const rand = require('./exp-utils/rand');
const lottery = require('./exp-utils/lottery');
const shuffle = require('./exp-utils/shuffle');

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
