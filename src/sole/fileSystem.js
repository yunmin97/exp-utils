/*
 * @Author: yunmin
 * @Email: 362279869@qq.com
 * @Date: 2020/2/22 17:35
 */

const fs = require('fs');
const path = require('path');

// json file name check
function jsonFileName(name) {
    if (!path.extname(name)) {
        return name + '.json';
    }
    return name;
}

// create folder recursive
function createDirs(dir, cb) {
    fs.exists(dir, function (exists) {
        if (exists) {
            cb();
        } else {
            createDirs(path.dirname(dir), function () {
                fs.mkdir(dir, cb);
            });
        }
    });
}

// gets the names of all files in the specified directory
function filesInFolder(dir, arr, ext, rec) {
    dir = path.join(dir, '/');
    let files = fs.readdirSync(dir);
    files.forEach(function (name) {
        if (fs.statSync(dir + name).isDirectory()) {
            if (rec) {
                // read from sub directory..
                let pth = path.join(dir, name, '/');
                filesInFolder(pth, arr, ext, rec);
            }
        } else {
            if (!ext || path.extname(name) === ext) {
                // file's info
                arr.push({
                    path: dir,
                    name: name
                });
            }
        }
    });
}

// gets all folders in the specified directory
function foldersInDir(dir, arr, rec) {
    dir = path.join(dir, '/');
    let files = fs.readdirSync(dir);
    files.forEach(function (fld) {
        if (fs.statSync(dir + fld).isDirectory()) {
            let pth = path.join(dir, fld, "/");
            arr.push(pth);
            if (rec) {
                // read sub directory..
                foldersInDir(pth, arr, rec);
            }
        }
    });
}

// use it like instance
module.exports = {
    /**
     * read a file from disk
     *
     * @param {String} n the file's name(log.txt/pic.png..)
     * @param {Function} cb read down callback
     * @return {void}
     */
    read: function (n, cb) {
        if (!fs.existsSync(n)) {
            cb(new Error(`file(${n}) not exist!`), null);
            return;
        }
        fs.readFile(n, function (e, b) {
            if (e) {
                e.message += `, bad file(${n})!`;
            }
            cb(e, b);
        });
    },

    /**
     * read a file from disk sync
     *
     * @param {String} n the file's name(log.txt/pic.png..)
     * @return {*} data buffer
     */
    readSync: function (n) {
        if (!fs.existsSync(n)) {
            console.error(`file(${n}) not exist!`);
            return null;
        }
        return fs.readFileSync(n);
    },

    /**
     * write data to a file
     *
     * @param {String} n the file's name(log.txt/card.json..)
     * @param {*} o data buffer
     * @param {Function} cb write down callback
     * @return {void}
     */
    write: function (n, o, cb) {
        if (Buffer.isBuffer(o)) {
            fs.writeFile(n, o, cb);
            return;
        }
        let buf;
        if (typeof o !== 'string') {
            buf = JSON.stringify(o);
        } else {
            buf = o;
        }
        fs.writeFile(n, buf, cb);
    },

    /**
     * write data to a file sync
     *
     * @param {String} n the file's name(log.txt/card.json..)
     * @param {*} o data buffer
     * @return {void}
     */
    writeSync: function (n, o) {
        if (Buffer.isBuffer(o)) {
            fs.writeFileSync(n, o,);
            return;
        }
        let buf;
        if (typeof o !== 'string') {
            buf = JSON.stringify(o);
        } else {
            buf = o;
        }
        fs.writeFileSync(n, buf);
    },


    /**
     * checks whether the string is a json string
     *
     * @param {String} s string to checked
     * @return {Boolean}
     */
    isJsonStr: function (s) {
        if (typeof s !== 'string') {
            return false;
        }
        try {
            JSON.parse(s);
        } catch (e) {
            return false
        }
        return true;
    },

    /**
     * read a json file from disk
     *
     * @param {String} n a file's name(log.json/log)
     * @param {Function} cb read down callback
     * @return {void}
     */
    readAsJson: function (n, cb) {
        n = jsonFileName(n);
        this.read(n, function (e, b) {
            if (e) {
                cb(e, b);
                return;
            }
            let d = null;
            try {
                d = JSON.parse(b.toString());
            } catch (r) {
                r.message += `, bad json file(${n})!`;
                e = r;
            }
            cb(e, d);
        });
    },

    /**
     * read a json file from disk sync
     *
     * @param {String} n json file's name(log.json/log)
     * @return {Object} json object
     */
    readAsJsonSync: function (n) {
        let d = null;
        n = jsonFileName(n);
        let b = this.readSync(n);
        if (b) {
            try {
                d = JSON.parse(b.toString());
            } catch (e) {
                console.error(`bad json file(${n})!`);
            }
        }
        return d;
    },

    /**
     * create folder recursive
     *
     * @param {String} dir folder(./a/b/c)
     * @param {Function} cb create down callback
     * @return {boolean}
     */
    makeDirs: function (dir, cb) {
        createDirs(dir, cb);
    },

    /**
     * create folder recursive sync
     *
     * @param {String} dir folder(./a/b/c)
     * @return {boolean}
     */
    makeDirsSync: function (dir) {
        if (fs.existsSync(dir)) {
            return true;
        } else {
            if (this.makeDirsSync(path.dirname(dir))) {
                fs.mkdirSync(dir);
                return true;
            }
        }
    },

    /**
     * gets the names of all files in the specified directory sync
     *
     * @param {String} dir  the folder's path(./folder)
     * @param {String} ext  the extname of file(.xlsx/.js/.png..)
     * @param {Boolean} rec  whether to read recursively
     * @return {Array} all files info
     */
    filesInDirSync: function (dir, ext = '', rec = true) {
        let arr = [];
        filesInFolder(dir, arr, ext, rec);
        return arr;
    },

    /**
     * gets all folders in the specified directory sync
     *
     * @param {String} dir  the folder's path
     * @param {Boolean} rec  whether to read recursively
     * @return {Array} all folders
     */
    foldersInDirSync: function (dir, rec = true) {
        let arr = [];
        foldersInDir(dir, arr, rec);
        return arr;
    },

    /**
     * copy all sub folders in the source folder to the destination folder recursive sync
     *
     * @param {String} src the source folder(./folderA)
     * @param {String} dest the destination folder(./folderB)
     * @return {void}
     */
    copyFoldersSync: function (src, dest) {
        src = path.join(src, '/');
        dest = path.join(dest, '/');
        // get sub dir in source recursive
        let dirs = this.foldersInDirSync(src, true);
        let length = dirs.length;
        for (let i = 0; i < length; i++) {
            // replace root dir(source root to destination root dir)
            dirs[i] = dirs[i].replace(src, dest);
            // create sub dir in destination recursive
            this.makeDirsSync(dirs[i]);
        }
    },

    /**
     * move all files in the source folder to the destination folder recursive sync
     * preserve directory structure of the source folder
     * @param {String} src the source folder(./folderA)
     * @param {String} dest the destination folder(./folderB)
     * @return {void}
     */
    moveFiles2DirSync: function (src, dest) {
        src = path.join(src, '/');
        dest = path.join(dest, '/');
        // create destination sub dir..
        this.copyFoldersSync(src, dest);
        // read files from source..
        let files = this.filesInDirSync(src);
        // move files to destination dir..
        files.forEach(function (file) {
            let src_pth = path.join(file.path, file.name);
            let dest_pth = src_pth.replace(src, dest);
            fs.renameSync(src_pth, dest_pth);
            fs.statSync(dest_pth);
        });
    },

    /**
     * copy all files in the source folder to the destination folder recursive
     *
     * @param {String} src the source folder(./folderA)
     * @param {String} dest the destination folder(./folderB)
     * @return {void}
     */
    copyFiles2DirSync: function (src, dest) {
        src = path.join(src, '/');
        dest = path.join(dest, '/');
        // create destination sub dir..
        this.copyFoldersSync(src, dest);
        // read files from source..
        let files = this.filesInDirSync(src);
        // copy files to destination dir..
        files.forEach(function (file) {
            let src_pth = path.join(file.path, file.name);
            let dest_pth = src_pth.replace(src, dest);
            let readStream = fs.createReadStream(src_pth);
            let writeStream = fs.createWriteStream(dest_pth);
            readStream.pipe(writeStream);
        });
    }
};

