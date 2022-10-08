/*
 * @Author: yunmin
 * @Email: 362279869@qq.com
 * @Date: 2020-02-11 23:55:22
 */

const {
    utils,
    eventSystem,
    cryptoSystem,
    fileSystem,
    mysqlPool,
    redisPool,
    cmdSystem
} = require('../../index');

let crypto_test = function () {
    let word = '你好, hello, 안녕하세요, こんにちは...';
    let rt = cryptoSystem.encryptAES256(word);
    console.log(rt);
    rt = cryptoSystem.decryptAES256(rt);
    console.log(rt);
    console.log(rt === word);

    rt = cryptoSystem.tokenGenerate();
    console.log(rt);
};
let event_test = function () {
    console.log('\n---event system test---');
    let event_name1 = 'event001';
    let event_name2 = 'event002';

    let listener1 = function (id, name) {
        console.log('listener1 receive: ');
        console.log('id: ' + id);
        console.log('name: ' + name);
    };
    let listener2 = function (id, name) {
        console.log('listener2 receive: ');
        console.log('id: ' + id);
        console.log('name: ' + name);
    };
    let listener3 = function (age, sex, option) {
        console.log('listener3 receive: ');
        console.log('age: ' + age);
        console.log('sex: ' + sex);
        console.log(option);
    };

    eventSystem.add(event_name1, listener1);
    eventSystem.add(event_name1, listener2);
    eventSystem.once(event_name2, listener3);

    setTimeout(function () {
        console.log('dispatch events');
        eventSystem.emit(event_name1, 10, 'name');
        eventSystem.emit(event_name2, 30, 'man', {
            id: 532621,
            name: 'yunmin'
        });
    }, 1000);
};
let file_test = function () {
    // is a json string?
    console.log(fileSystem.isJsonStr('heldsfd sdsfd'));
    console.log(fileSystem.isJsonStr(JSON.stringify({
        id: 100
    })));

    // write to the file
    fileSystem.writeSync("filename.json", {
        id: 1,
        name: "json object"
    });
    // read from a json file
    console.log(fileSystem.readAsJsonSync("filename"));

    // write to the file async
    fileSystem.write("filename1.json", {
        id: 2,
        name: "another json object"
    }, function (err) {
        if (err) {
            console.error(err.message);
            return;
        }
        console.log('write down async');
    });
    // read from a json file async
    fileSystem.readAsJson("filename1", function (err, res) {
        if (err) {
            console.error(err.message);
            return;
        }
        console.log(res);
    });
};
let mysql_test = function () {
    // create mysql client in file1.js
    let client = mysqlPool.create({
        "host": "127.0.0.1",
        "port": 3306,
        "connectionLimit": 10,
        "database": "test",
        "user": "username",
        "password": "111111",
    });
    // query like in file2.js
    let id = '64';
    let sql = 'select * from sys.sys_config where value = ?';
    mysqlPool.query(sql, [id], function (err, res) {
        // show result
        console.log(err);
        console.log(res);

        // close connect
        mysqlPool.shutdown();
    });
};
let redis_test = function () {
    // create redis client
    let client = redisPool.create({
        "host": "127.0.0.1",
        "port": 6379,
        "db": 0,
        "password": "111111"
    }, function () {
        console.log("redis connected!");

        console.log(redisPool.ready());

        // use like
        client.set("key", "value_to_save_for_test");
        client.get("key", function (err, reply) {
            // will print `value`
            console.log(err);
            console.log(reply.toString());
        });

        // close connect
        redisPool.shutdown();
    });
};
let utils_test = function () {
    console.log(utils.contain([1, 2, 3], 10));
    console.log(utils.contain({id: 100}, 'id'));
    console.log(utils.contain('i am a test code', 'a test'));

    utils.invoke(function (err, res) {
        console.log(err);
        console.log(res);
    }, null, 100);

    let arr = [1, 2, 3, 4, 6];
    console.log(utils.delete(arr, 3));
    console.log(arr);
    let obj = {id: 1, name: 'exp-utils', age: 100, level: 50};
    console.log(utils.delete(obj, 'age'));
    console.log(obj);

    utils.propertiesEnumerable(obj, ['name']);
    console.log(obj.name);
    console.log(obj);
    console.log(JSON.stringify(obj));

    arr = [{
        id: 1,
        name: "b1"
    }, {
        id: 18,
        name: "b18"
    }, {
        id: 9,
        name: "b9"
    }, {
        id: 11,
        name: "b11"
    }, {
        id: 5,
        name: "b5"
    }];
    utils.sortByKey(arr, 'id', false);
    console.log(arr);

    let index = 102;
    let acc = 'id' + utils.number2String(index, 6);
    console.log(acc);
};
let cmd_test = function () {
    cmdSystem.add("-o", function(params, next) {
        console.log("doing something... ");
        utils.invoke(next);
    }, "output");
    cmdSystem.add("-i", function(params, next) {
        console.log("doing otherthing... ");
        utils.invoke(next, "next action");
    }, "input");
    cmdSystem.start(true);
}
