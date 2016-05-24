EncryptionService = {
    setupUserEncryptionKeychain: function(password) {
        var encryption = {};

        // Generate 128 bits salt
        var salt = EncryptionService.generateKey(128);
        // Generate 512 bits password-based key
        var pbk = EncryptionService.generatePasswordBasedKey(password, salt);
        // Get password validator and encryption key from the pbk above
        var passwordValidatorAndKey = EncryptionService.splitKeyInHalf(pbk);
        // Generate a master key which will be used to encrypt every data stored
        var masterKey = EncryptionService.generateKey(256);

        // Store data in database
        encryption.salt = salt;
        encryption.passwordValidator = passwordValidatorAndKey.passwordValidator;
        // Store encrypted master key using pbk's MSB key
        encryption.masterKey = CryptoJS.AES.encrypt(masterKey, passwordValidatorAndKey.key).toString();

        return encryption;
    },
    encrypt: function(text, key, iv) {
        return CryptoJS.AES.encrypt(text, key, { iv: iv }).toString();
    },
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