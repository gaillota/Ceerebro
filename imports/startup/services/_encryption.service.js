import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {CryptoJS} from 'meteor/jparker:crypto-core';
import {_} from 'lodash';

import {getMasterKey} from '../utilities';

export const EncryptionService = {
    config: {
        saltLength: 128,
        masterKeyLength: 256
    },
    /**
     * Setup the user keychain needed to encrypt data smoothly
     *
     * @param password
     * @param callback
     * @returns {{}}
     */
    setupUserKeychain({password}, callback) {
        // Generate 128 bits salt
        const salt = this.generateKey({size: this.config.saltLength});
        // Generate 512 bits password-based key
        const key = this.generatePasswordBasedKey({password, salt});
        // Get password validator and encryption key from the pbk above
        const passwordValidatorAndKey = this.splitKeyInHalf({key});
        // Generate a master key which will be used to encrypt every data stored
        // (AES-256 requires 256 bits key)
        const masterKey = this.generateKey({size: this.config.masterKeyLength});

        const keychain = {};
        // Store data in database
        keychain.salt = salt;
        keychain.passwordValidator = passwordValidatorAndKey.passwordValidator;
        // Store encrypted master key using pbk's MSB key
        keychain.masterKey = this.encrypt({text: masterKey, key: passwordValidatorAndKey.key});

        if (callback && _.isFunction(callback)) {
            // Call asynchronous callback function with the :keychain as parameter
            callback(keychain);
        }
    },
    /**
     * Decrypt user's master key using his password
     *
     * @param password
     * @param callback
     */
    decryptMasterPassword({password}, callback) {
        check(callback, Function);

        const keychain = Meteor.user().keychain;
        const pbk = this.generatePasswordBasedKey({password, salt: keychain.salt});
        const {passwordValidator, key} = this.splitKeyInHalf({key: pbk});
        if (keychain.passwordValidator !== passwordValidator) {
            callback(new Error("Password validators don't match"));
            return;
        }

        const masterKey = this.decrypt({cipherText: keychain.masterKey, key: key});
        callback(null, {masterKey});
    },
    encryptPassword({password, iv}) {
        const masterKey = getMasterKey();
        if (!masterKey) {
            throw new Meteor.Error('not-possible', 'Cannot encrypt password without the master key');
        }

        return this.encrypt({text: password, key: masterKey, iv});
    },
    decryptPassword({encryptedPassword, iv}) {
        const masterKey = getMasterKey();
        if (!masterKey) {
            throw new Meteor.Error('not-possible', 'Cannot decrypt password without the master key');
        }

        return this.decrypt({cipherText: encryptedPassword, key: masterKey, iv});
    },
    /**
     * Wrapper for AES encrypt function
     *
     * @param text
     * @param key
     * @param iv
     * @returns {string|*}
     */
    encrypt({text, key, iv = ''}) {
        return CryptoJS.AES.encrypt(text, key, {iv: iv}).toString();
    },
    /**
     * Wrapper for AES decrypt function
     *
     * @param cipherText
     * @param key
     * @param iv
     * @returns {string|*}
     */
    decrypt({cipherText, key, iv = ''}) {
        return CryptoJS.AES.decrypt(cipherText, key, {iv: iv}).toString(CryptoJS.enc.Utf8);
    },
    /**
     * Get password validator (LSB) and encryption key (MSB) from password based key.
     *
     * @param key
     * @returns {{key: (string|*), passwordValidator: (string|*)}}
     */
    splitKeyInHalf({key}) {
        check(key, String);
        const half = key.length / 2;

        return {
            key: key.substr(0, half),
            passwordValidator: key.substr(half)
        };
    },
    /**
     * Generate 512 bits password-based key from user {password} and {salt}
     *
     * @param password
     * @param salt
     * @returns {string}
     */
    generatePasswordBasedKey({password, salt}) {
        check(password, String);
        check(salt, String);

        return CryptoJS.EvpKDF(password, salt, {keySize: 512 / 32, iterations: 1000}).toString();
    },
    /**
     * Return {size} bits length key
     *
     * @param size
     * @returns {string}
     */
    generateKey({size}) {
        check(size, Number);

        return CryptoJS.lib.WordArray.random(size / 8).toString();
    }
};
