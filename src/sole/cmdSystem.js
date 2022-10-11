/*
 * @Author: yunmin
 * @Email: 362279869@qq.com
 * @Date: 2022-10-07 18:47:58
 */
const readline = require('readline');
const invoke = require('../invoke').proxy;

let tipsMap = new Map();
let funcsMap = new Map();

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

function getInstructions(key, code) {
    let rt = "helpful tips:\n";
    tipsMap.forEach((v, k) => {
        rt += k + "         " + v + "\n";
    });
    return rt;
}

function addCmd(cmd, cb, tips) {
    let k = cmd.trim();
    if (funcsMap.has(k)) {
        console.warn(k + " has been added, please use other.");
        return;
    }
    funcsMap.set(cmd, cb);
    tipsMap.set(cmd, tips);
}

class Command {
    constructor() {};

    init(help, opts) {
        addCmd("-h", this.onHelp.bind(this), "show help tips");
        addCmd("exit", this.onQuit.bind(this), ""); 
        if (help) {
            console.log(getInstructions());
        }     
        //setup
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

    onHelp() {
        console.log(getInstructions());
        this.rl.prompt();
    };

    onQuit() {
        console.log("bye.");
        process.exit(0);
    };

    onHandler(line) {
        let params = getParams(line.trim());
        let k = params.splice(0, 1)[0];
        if (funcsMap.has(k)) {
            invoke(funcsMap.get(k), params, this.onNext.bind(this));
        }
        else {
            console.log("typing -h for help.\n");
            this.rl.prompt();
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
        addCmd(cmd, cb, tips);
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
            console.warn("You must add a command config first.");
        }
        else {
            command.init(help, opts);
        }
    }
};
