/*
 * @Author: yunmin
 * @Email: 362279869@qq.com
 * @Date: 2020/3/21 18:27
 */

const rand = require('./rand');

/**
 * play a lottery, return the hit item
 *
 * @param {Array} arr  the award weights([number..]/[object..])
 * @param {String} k  weight attribute name in object of the arr
 * @return {*} hit item
 * @example
 *
 * // return hit index of the arr
 * let arr = [0.20, 0.30, 0.10, 0.15, 0.25];
 * let index = utils.roulette(arr);
 *
 * // return hit item in the arr
 * let arr = [{id: 1, w: 0.35}, {id: 2, w: 0.25}, {id: 3, w: 0.5}];
 * let obj = utils.roulette(arr);
 *
 */
exports.proxy = function (arr, k = '') {
    if (arr.length <= 0) {
        return -1;
    }
    let w = 0;
    arr.forEach(function (o) {
        if (k) {
            w += o[k];
        } else {
            w += o;
        }
    });
    let n = rand.proxy(0, w, true);
    let l = arr.length - 1;
    for (let i = l; i >= 0; i--) {
        if (k) {
            w -= arr[i][k];
            if (n >= w) {
                return arr[i];
            }
        } else {
            w -= arr[i];
            if (n >= w) {
                return i;
            }
        }
    }
    return l;
};

