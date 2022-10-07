/*
 * @Author: yunmin
 * @Email: 362279869@qq.com
 * @Date: 2020/2/23 10:20
 */

/**
 * sorts the array by object's key in an array
 *
 * @param {Array} arr the array to sort
 * @param {String} k the key use to sort
 * @param {boolean} asc true for ascending and false for descending
 * @returns {void}
 * @example
 *
 * let arr = [{id:6},{id:2}...];
 * sortByKey(arr, 'id', false);
 *
 */
exports.proxy = function (arr, k, asc = true) {
    if (!Array.isArray(arr)) {
        console.warn('need an array!');
        return;
    }
    arr.sort(function (a, b) {
        if (a[k] < b[k]) {
            return -1;
        } else if (a[k] > b[k]) {
            return 1;
        }
        return 0;
    });
    if (!asc) {
        arr.reverse();
    }
};

