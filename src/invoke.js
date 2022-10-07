/*
 * @Author: yunmin
 * @Email: 362279869@qq.com
 * @Date: 2020/2/22 13:55
 */

/**
 * invoke the cb if it's a function
 *
 * @param {Function} cb the function to called
 * @returns {void}
 * @example
 *
 * invoke(function(err, res) {
 *    console.log(err); => null
 *    console.log(res); => 100
 * }, null, 100);
 *
 */
exports.proxy = function (cb) {
    if (typeof cb === 'function') {
        cb.apply(null, Array.prototype.slice.call(arguments, 1));
    }
};
