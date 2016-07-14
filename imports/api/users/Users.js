import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Roles } from "meteor/alanning:roles";

import { Credentials } from '../credentials/credentials';

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
Meteor.users.schema = new SimpleSchema({
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

Meteor.users.attachSchema(Meteor.users.schema);

// Prevent client from modifying user collection
Meteor.users.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});

Meteor.users.helpers({
    credentials() {
        return Credentials.find({
            owner: this._id
        });
    },
    isAdmin() {
        return Roles.userIsInRole(this._id, 'admin');
    }
});