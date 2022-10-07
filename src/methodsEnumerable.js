/*
 * @Author: yunmin
 * @Email: 362279869@qq.com
 * @Date: 2020/2/22 14:23
 */

/**
 * enable/disable methods enumerable of class except excludes
 *
 * @param {Object} cn a class name
 * @param {Array} excludes methods(string array) not to modify
 * @param {Boolean} e enable or disable
 * @return {void}
 * @example
 *
 * used for pomelo ES6 support
 *
 * class Handler: {...}
 * methodsEnumerable(Handler, ['constructor']);
 *
 */
exports.proxy = function (cn, excludes, e = true) {
    let cp = cn.prototype;
    // get all methods of the class
    let methods = Object.getOwnPropertyNames(cp);
    // for performance and memory spending
    methods.forEach(function (m) {
        if (!excludes.includes(m)) {
            Object.defineProperty(cp, m, {
                enumerable: e
            });
        }
    });
    /* working but need to create a configs
    let configs = {};
    methods.forEach(function (m) {
        configs[m] = {
            enumerable: enable || true
        };
    });
    Object.defineProperties(target, configs);//*/
};
