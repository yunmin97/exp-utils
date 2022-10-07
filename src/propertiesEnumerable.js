/*
 * @Author: yunmin
 * @Email: 362279869@qq.com
 * @Date: 2020/2/22 15:15
 */

/**
 * enable/disable property enumerable of a object
 *
 * @param {Object} o the target object
 * @param {Array} names property names(string array) to modify
 * @param {Boolean} e enable or disable
 * @return {void}
 * @example
 *
 * let obj = new Class();
 * propertiesEnumerable(obj, ['id', 'name']);
 *
 */
exports.proxy = function (o, names, e = false) {
    names.forEach(function (p) {
        Object.defineProperty(o, p, {
            enumerable: e
        });
    });
};
