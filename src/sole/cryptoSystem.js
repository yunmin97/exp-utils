/*
 * @Author: yunmin
 * @Email: 362279869@qq.com
 * @Date: 2020/2/22 15:48
 */

const crypto = require('crypto');

const default_key = 'ae125efkk4454eeff444ferfkny6oxi8';

// use it like instance
module.exports = {
    /**
     * encrypt with aes-256 / ecb mode
     *
     * @param {String} s encrypt string
     * @param {String} k secret key
     * @return {String} encrypted string
     */
    encryptAES256: function (s, k = default_key) {
        let iv = "";
        let clearEncoding = 'utf8';
        let cipherEncoding = 'base64';
        let cipherChunks = [];
        // base on ECB mode not CBC
        let cipher = crypto.createCipheriv('aes-256-ecb', k, iv);
        cipher.setAutoPadding(true);
        cipherChunks.push(cipher.update(s, clearEncoding, cipherEncoding));
        cipherChunks.push(cipher.final(cipherEncoding));
        return cipherChunks.join('');
    },

    /**
     * decrypt with aes-256 / ecb mode
     *
     * @param {String} s decrypt string
     * @param {String} k secret key
     * @return {String} decrypted string
     */
    decryptAES256: function (s, k = default_key) {
        let iv = "";
        let clearEncoding = 'utf8';
        let cipherEncoding = 'base64';
        let cipherChunks = [];
        // base on ECB mode not CBC
        let decipher = crypto.createDecipheriv('aes-256-ecb', k, iv);
        decipher.setAutoPadding(true);
        cipherChunks.push(decipher.update(s, cipherEncoding, clearEncoding));
        cipherChunks.push(decipher.final(clearEncoding));
        return cipherChunks.join('');
    },

    /**
     * generate pseudo-random code
     *
     * @return {String} return token code
     */
    tokenGenerate: function () {
        let buf = crypto.randomBytes(16);
        return buf.toString('hex');
    }
};
