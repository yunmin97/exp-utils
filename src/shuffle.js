/*
 * @Author: yunmin
 * @Email: 362279869@qq.com
 * @Date: 2020/3/22 0:26
 */

const rand = require('./rand');

/**
 *  shuffle an array easily
 *
 * @param {Array} arr  the minimum number(include)
 * @return {void}
 * @example
 *
 * let arr = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];
 * utils.shuffle(arr);
 *
 * let arr = [1, 2, 3, 4];
 * utils.shuffle(arr);
 */
exports.proxy = function (arr) {
    let n = arr.length;
    while (n > 1) {
        n--;
        let k = rand.proxy(0, n + 1);
        let value = arr[k];
        arr[k] = arr[n];
        arr[n] = value;
    }
};

