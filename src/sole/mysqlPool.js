/*
 * @Author: yunmin
 * @Email: 362279869@qq.com
 * @Date: 2020/2/22 21:26
 */

const mysql = require('mysql');

let _pool = null;

// grant all privileges on table_name.* to 'username'@'%';
/*************************************************************************
 * create mysql client:
 * let pool = mysqlPool.create(config);
 *
 * use mysql like:
 * let id = 1;
 * let sql = 'select * from `database.table` where `id` = ?';
 * mysqlPool.query(sql, [id], function(err, res, fields){ ... });
 ************************************************************************/
module.exports = {
    /**
     * create mysql connecting pool
     *
     * @param  opts{object}  config option
     * @return  {object}
     */
    create: function (opts) {
        if (!_pool) {
            //{<host>,<port>,<user>,<password>,<database>,<connectionLimit>..}
            _pool = mysql.createPool(opts);
            return _pool;
        }
        console.warn('mysql already created!');
        return _pool;
    },

    /**
     * query action to mysql
     *
     * @param  sql{string}  sql for update/insert
     * @param  args{array}  value to update/insert..
     * @param  cb{function}  query down callback
     * @return  {object}
     */
    query: function (sql, args, cb) {
        _pool.getConnection(function (err, conn) {
            if (err) {
                cb(err, {}, "get mysql conn error!");
            } else {
                conn.query(sql, args, function (e, res, fields) {
                    cb(e, res, fields);
                    conn.release();
                    // handle error after the release, handle out side with cb
                    if (e) {
                        console.error(e);
                    }
                });
            }
        });
    },

    /**
     * stop the connect pool
     *
     * @return  {void}
     */
    shutdown: function () {
        _pool.end();
    }
};
