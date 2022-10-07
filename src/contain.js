/*
 * @Author: yunmin
 * @Email: 362279869@qq.com
 * @Date: 2020/2/22 12:48
 */

/**
 * checks if Array|Object|String is contain a value|key|string
 *
 * @param {Array|Object|String} o  the value to check
 * @param {*} v the value|key
 * @returns {boolean} returns true if o is contain v, else false
 * @example
 *
 * console.log(contain([1, 2, 3, 3], 4));
 * => false
 *
 * console.log(contain({id: 100}, 'id'));
 * => true
 *
 * console.log(contain('hello world', 'hel'));
 * => true
 *
 */
exports.proxy = function (o, v) {
    if (Array.isArray(o)) {
        return o.includes(v);
    }
    if (typeof o === 'string') {
        return o.includes(v);
    }
    return o[v] !== undefined;
};
