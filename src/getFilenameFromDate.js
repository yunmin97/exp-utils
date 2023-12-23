/*
 * @Author: yunmin
 * @Email: 362279869@qq.com
 * @Date: 2023/12/23 16:07
 */

/**
 * get a filename for current date-time
 *
 * @param {String} append string append to end
 * @return {String} a date filename
 */
exports.proxy = function (append) {
        let date = new Date();
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let day = String(date.getDate()).padStart(2, '0');
        let hours = String(date.getHours()).padStart(2, '0');
        let minutes = String(date.getMinutes()).padStart(2, '0');
        let seconds = String(date.getSeconds()).padStart(2, '0');
        let rt = `${year}${month}${day}_${hours}${minutes}${seconds}`;
        if (typeof append === 'string') {
                rt += append;
        }
        return rt;
};
