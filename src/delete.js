/*
 * @Author: yunmin
 * @Email: 362279869@qq.com
 * @Date: 2020/2/22 14:28
 */

/**
 * delete a value|key in the Array|Object
 *
 * @param {Array|Object} o the array|object
 * @param {*} v the value|key to delete
 * @return {boolean} succeed or not
 * @example
 *
 * console.log(delete([1, 2, 3, 4, 6], 3));
 * => true
 * => [1, 2, 4, 6]
 *
 * console.log(delete({id: 1, name: 'name', age: 100}, 'age'));
 * => true
 * => {id: 1, name: 'name'}
 *
 */
exports.proxy = function (o, v) {
    if (Array.isArray(o)) {
        let i = o.indexOf(v);
        if (i !== -1) {
            o.splice(i, 1);
            return true;
        }
        return false;
    }
    if (o[v] !== undefined) {
        delete o[v];
        return true;
    }
    return false;
};
