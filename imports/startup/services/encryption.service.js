import {check} from 'meteor/check';
import {CryptoJS} from 'meteor/jparker:crypto-core';

import {getMasterKey} from '../utilities';

export const EncryptionService = (function () {
    /**
     * Setup the user keychain needed to encrypt data smoothly
     *
     * @param password
     * @param callback
     * @returns {{}}
     */
    function setupUserKeychain(password, callback) {
        let keychain = {};

        // Generate 128 bits salt
        const salt = generateKey(128);
        // Generate 512 bits password-based key
        const pbk = generatePasswordBasedKey(password, salt);
        // Get password validator and encryption key from the pbk above
        const passwordValidatorAndKey = splitKeyInHalf(pbk);
        // Generate a master key which will be used to encrypt every data stored
        // (AES-256 requires 256 bits key)
        const masterKey = generateKey(256);

        // Store data in database
        keychain.salt = salt;
        keychain.passwordValidator = passwordValidatorAndKey.passwordValidator;
        // Store encrypted master key using pbk's MSB key
        keychain.masterKey = CryptoJS.AES.encrypt(masterKey, passwordValidatorAndKey.key).toString();


        // Call asynchronous callback function with the :keychain as parameter
        callback(keychain);
    }

    /**
     * Wrapper for AES encrypt function
     *
     * @param text
     * @param iv
     * @returns {string|*}
     */
    function encrypt(text, iv) {
        const key = getMasterKey();
        if (!key) {
            return;
        }

        return CryptoJS.AES.encrypt(text, key, {iv: iv}).toString();
    }

    /**
     * Wrapper for AES decrypt function
     *
     * @param cipher
     * @param iv
     * @returns {string|*}
     */
    function decrypt(cipher, iv) {
        const key = getMasterKey();
        if (!key) {
            return;
        }

        return CryptoJS.AES.decrypt(cipher, key, {iv: iv}).toString(CryptoJS.enc.Utf8);
    }

    /**
     * Get password validator (LSB) and encryption key (MSB) from password based key.
     *
     * @param key
     * @returns {{key: (string|*), passwordValidator: (string|*)}}
     */
    function splitKeyInHalf(key) {
        check(key, String);
        const half = key.length / 2;

        return {
            key: key.substr(0, half),
            passwordValidator: key.substr(half)
        };
    }

    /**
     * Generate 512 bits password-based key from user {password} and {salt}
     *
     * @param password
     * @param salt
     * @returns {string}
     */
    function generatePasswordBasedKey(password, salt) {
        check(password, String);
        check(salt, String);
        return CryptoJS.EvpKDF(password, salt, {keySize: 512 / 32, iterations: 1000}).toString();
    }

    /**
     * Return {bits} bits length key
     *
     * @param bits
     * @returns {string}
     */
    function generateKey(bits) {
        check(bits, Number);
        return CryptoJS.lib.WordArray.random(bits / 8).toString();
    }

    return {
        setupUserKeychain: setupUserKeychain,
        encrypt: encrypt,
        decrypt: decrypt,
        splitKeyInHalf: splitKeyInHalf,
        generatePasswordBasedKey: generatePasswordBasedKey,
        generateKey: generateKey
    };
})();
