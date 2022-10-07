/*
 * @Author: yunmin
 * @Email: 362279869@qq.com
 * @Date: 2020/2/22 22:01
 */

const redis = require("redis");

let _pool = null;
let _ready = false;

/*************************************************************************
 * create redis client:
 * let client = redisPool.create(config, cb);
 *
 * use redis like:
 * client.set("key", "value");
 * client.get("key", function (err, reply) {
 *      // will print `value`
 *      console.log(reply.toString());
 * });
 ************************************************************************/
module.exports = {
    /**
     * create redis connection pool
     *
     * @param  opts{object}  config option
     * @param  cb{function}  create down callback
     * @return  {object}
     */
    create: function (opts, cb) {
        if (!_pool) {
            //{<host>,<port>,<password>,<db>..}
            _pool = redis.createClient(opts);
            _pool.on('ready', function () {
                _ready = true;
                cb();
            });
            _pool.on("error", function (error) {
                console.error(error);
            });
            return _pool;
        }
        console.warn('redis already created!');
        return _pool;
    },

    /**
     * checks whether the client has connected
     *
     * @return {boolean} ready or not
     */
    ready: function () {
        return _ready;
    },

    /**
     * get the redis client
     *
     * @return {Object}
     */
    client: function () {
        return _pool;
    },

    /**
     * stop the connect pool
     *
     * @return  {void}
     */
    shutdown: function () {
        _ready = false;
        _pool.quit();
    }
};