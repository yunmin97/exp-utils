/*
 * @Author: yunmin
 * @Email: 362279869@qq.com
 * @Date: 2020-02-11 23:01:15
 */

const Emitter = require('events').EventEmitter;
const emitter = new Emitter();

// use it like instance
module.exports = {
    /**
     * register an listener
     *
     * @param {String|Symbol} e event name
     * @param {Function} cb event callback
     * @param {boolean} prepend whether to add it to the front
     * @return {module:events.EventEmitter.EventEmitter}
     */
    add: function (e, cb, prepend = false) {
        if (prepend) {
            return emitter.prependListener(e, cb);
        }
        return emitter.on(e, cb);
    },

    /**
     * register a one-time listener
     *
     * @param {String|Symbol} e event name
     * @param {Function} cb event callback
     * @param {boolean} prepend whether to add it to the front
     * @return {module:events.EventEmitter.EventEmitter}
     */
    once: function (e, cb, prepend = false) {
        if (prepend) {
            return emitter.prependOnceListener(e, cb);
        }
        return emitter.once(e, cb);
    },

    /**
     * unregister an listener
     *
     * @param {String|Symbol} e event name
     * @param {Function} cb event callback
     * @return {module:events.EventEmitter.EventEmitter}
     */
    remove: function (e, cb) {
        return emitter.removeListener(e, cb);
    },

    /**
     * unregister all listeners
     *
     * @param {String|Symbol} e event name
     * @return {module:events.EventEmitter.EventEmitter}
     */
    removeAll: function (e) {
        return emitter.removeAllListeners(e);
    },

    /**
     * broadcast an event
     *
     * @param {String|Symbol} e event name
     * @param  {...Object} p param send to listeners
     * @return {boolean}
     */
    emit: function (e, ...p) {
        return emitter.emit(e, ...p);
    },

    /**
     * set the maximum number of listeners, and return current settings
     *
     * @param {Number} n  maximum number
     * @return {Number}
     */
    max: function (n) {
        if (Number.isInteger(n)) {
            emitter.setMaxListeners(n);
        }
        return emitter.getMaxListeners();
    }
};
