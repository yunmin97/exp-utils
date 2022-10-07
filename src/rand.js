/*
 * @Author: yunmin
 * @Email: 362279869@qq.com
 * @Date: 2020/3/21 20:17
 */

/**
 * returns a pseudorandom number([min, max)) between min and max
 *
 * @param {Number} min  the minimum number(include)
 * @param {Number} max  the maximal number(exclude)
 * @param {boolean} flt  true for floating number(default: false)
 * @return {Number} random number
 *
 */
exports.proxy = function (min, max, flt = false) {
    if (min === max) {
        return min;
    }
    let t;
    // value swaps
    if (min > max) {
        t = min;
        min = max;
        max = t;
    }
    t = max - min;
    // [0, 1), eg: 0.2
    t *= Math.random();
    t += min;
    if (flt) {
        return t;
    }
    return parseInt(t);
};

