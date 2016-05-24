UserKeychainSchema = new SimpleSchema({
    masterKey: {
        type: String,
        min: 128,
        max: 128
    },
    salt: {
        type: String,
        min: 32,
        max: 32
    },
    passwordValidator: {
        type: String,
        min: 64,
        max: 64
    }
});

// User Simple Schema for server validation
UserSchema = new SimpleSchema({
    username: {
        type: String
    },
    emails: {
        type: Array,
        optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    roles: {
        type: [String],
        optional: true
    },
    lastConnectionAt: {
        type: Date,
        optional: true
    },
    disabled: {
        type: Boolean,
        optional: true
    },
    status: {
        type: Object,
        optional: true,
        blackbox: true
    },
    keychain: {
        type: UserKeychainSchema,
        optional: true
    }
});

Meteor.users.attachSchema(UserSchema);

// Prevent client from modifying user collection
Meteor.users.deny({
    'insert': function() {
        return true;
    },
    'update': function() {
        return true;
    },
    'remove': function() {
        return true;
    }
});