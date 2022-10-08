/*
 * @Author: yunmin
 * @Email: 362279869@qq.com
 * @Date: 2022-10-07 18:47:58
 */

const helpHey = "-h";
const readline = require('readline');
const invoke = require('../invoke').proxy;

let tipsMap = new Map();
let funcsMap = new Map();

function getInstructions(key, code) {
    let rt = "helpful tips:\n";
    tipsMap.forEach((v, k) => {
        rt += k + "         " + v + "\n";
    });
    return rt;
}

function getParams(line) {
    let arr = line.split(" ");
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].length == 0) {
            arr.splice(i, 1);
            i--;
        }
    }
    return arr;
}

class Command {
    constructor() { };

    init(opts) {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.rl.on("line", this.onHandler.bind(this));
        let option = opts || {};
        //set default user
        this.user = option.user || "administrator";
        this.onNext(option.tips);
    };

    onHandler(line) {
        let params = getParams(line.trim());
        let k = params.splice(0, 1)[0];
        if (k === helpHey) {
            console.log(getInstructions());
            this.rl.prompt();
        }
        else {
            if (funcsMap.has(k)) {
                invoke(funcsMap.get(k), params, this.onNext.bind(this));
            }
            else {
                console.log("typing -h for help\n");
                this.rl.prompt();
            }
        }
    };

    onNext = function (tips) {
        let date = new Date();
        let t = "[" + date.toLocaleString() + "] [CMD]: ";
        if (typeof tips === "string") {
            t += `${this.user}(${tips})`;
        }
        else {
            t += this.user;
        }
        this.rl.setPrompt(t + '=>');
        this.rl.prompt();
    };
}

let command = new Command();

// use it like instance
module.exports = {
    /**
     * add a command config
     * @param {string} cmd eg: -h
     * @param {Function} cb callback function
     * @param {string} tips command tips, eg help
     */
    add: function (cmd, cb, tips) {
        let k = cmd.trim();
        if (k === helpHey) {
            console.log(helpHey + " is reserved, please use other.");
            return;
        }
        funcsMap.set(cmd, cb);
        tipsMap.set(cmd, tips);
    },

    /**
     * remove a command config
     * @param {string} cmd 
     */
    remove: function (cmd) {
        if (funcsMap.has(cmd)) {
            tipsMap.delete(cmd);
            funcsMap.delete(cmd);
        }
    },

    /**
     * start cmd
     * @param {Boolean} help should show help tips
     * @param {Object} opts optional eg: {user: "administrator", tips: "action tips"}
     */
    start: function (help, opts) {
        if (funcsMap.size <= 0) {
            console.log("You must add a command config first.");
        }
        else {
            if (help) {
                console.log(getInstructions());
            }
            command.init(opts);
        }
    }
};
