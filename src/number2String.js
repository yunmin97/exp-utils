/*
 * @Author: yunmin
 * @Email: 362279869@qq.com
 * @Date: 2020/2/23 12:46
 */

/**
 * Converts a number to a string of the specified length by padding the character before it
 *
 * @param {Number} n the number to convert
 * @param {Number} l the function to called
 * @param {String} c the function to called
 * @returns {String}
 * @example
 *
 * let num = 102;
 * let acc = number2String(num, 7, '0');
 *
 */
exports.proxy = function (n, l, c = '0') {
    let str = n.toString();
    let count = l - str.length;
    if (c.length > 1) {
        c = c[0];
    }
    while (count-- > 0) {
        str = c + str;
    }
    return str;
};
