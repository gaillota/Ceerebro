export const EncryptionService = {
    /**
     * Setup the user keychain needed to encrypt data smoothly
     *
     * @param password
     * @returns {{}}
     */
    setupUserKeychain: function(password) {
        var keychain = {};

        // Generate 128 bits salt
        var salt = EncryptionService.generateKey(128);
        // Generate 512 bits password-based key
        var pbk = EncryptionService.generatePasswordBasedKey(password, salt);
        // Get password validator and encryption key from the pbk above
        var passwordValidatorAndKey = EncryptionService.splitKeyInHalf(pbk);
        // Generate a master key which will be used to encrypt every data stored
        // (AES-256 requires 256 bits key)
        var masterKey = EncryptionService.generateKey(256);

        // Store data in database
        keychain.salt = salt;
        keychain.passwordValidator = passwordValidatorAndKey.passwordValidator;
        // Store encrypted master key using pbk's MSB key
        keychain.masterKey = CryptoJS.AES.encrypt(masterKey, passwordValidatorAndKey.key).toString();

        return keychain;
    },
    ///**
    // * Update user keychain on password change
    // *
    // * @param oldPassword
    // * @param newPassword
    // * @returns {SimpleSchema.keychain|{type, optional}|number|*}
    // */
    //updateUserKeychain: function(oldPassword, newPassword) {
    //    removeMasterKey();
    //    var keychain = Meteor.user().keychain;
    //
    //    var pbk = EncryptionService.generatePasswordBasedKey(oldPassword, keychain.salt);
    //    var pbvak = EncryptionService.splitKeyInHalf(pbk);
    //    if (pbvak.passwordValidator != keychain.passwordValidator) {
    //        throw new Meteor.Error(403, 'Wrong password !');
    //    }
    //
    //    var masterKey = CryptoJS.AES.decrypt(keychain.masterKey, pbvak.key).toString(CryptoJS.enc.Utf8);
    //
    //    log(masterKey);
    //
    //    var newPasswordValidatorAndKey = EncryptionService.splitKeyInHalf(EncryptionService.generatePasswordBasedKey(newPassword, keychain.salt));
    //
    //    keychain.passwordValidator = newPasswordValidatorAndKey.passwordValidator;
    //    keychain.masterKey = CryptoJS.AES.encrypt(masterKey, pbvak.key).toString();
    //
    //    return keychain;
    //},
    /**
     * Wrapper for AES encrypt function
     *
     * @param text
     * @param key
     * @param iv
     * @returns {string|*}
     */
    encrypt: function(text, key, iv) {
        return CryptoJS.AES.encrypt(text, key, { iv: iv }).toString();
    },
    /**
     * Wrapper for AES decrypt function
     *
     * @param cipher
     * @param key
     * @param iv
     * @returns {string|*}
     */
    decrypt: function(cipher, key, iv) {
        return CryptoJS.AES.decrypt(cipher, key, { iv: iv }).toString(CryptoJS.enc.Utf8);
    },
    /**
     * Get password validator (LSB) and encryption key (MSB) from password based key.
     *
     * @param key
     * @returns {{key: (string|*), passwordValidator: (string|*)}}
     */
    splitKeyInHalf: function(key) {
        check(key, String);
        var half = key.length / 2;

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
    generatePasswordBasedKey: function(password, salt) {
        check(password, String);
        check(salt, String);
        return CryptoJS.EvpKDF(password, salt, { keySize: 512/32, iterations: 1000 }).toString();
    },
    /**
     * Return {bits} bits length key
     *
     * @param bits
     * @returns {string}
     */
    generateKey: function(bits) {
        check(bits, Number);
        return CryptoJS.lib.WordArray.random(bits/8).toString();
    }
};