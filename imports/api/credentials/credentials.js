import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

import {denyAll, defaultSchema} from '../common';

export const Credentials = new Mongo.Collection("credentials");

// Deny all client-side access (management through methods)
Credentials.deny(denyAll);

Credentials.schema = new SimpleSchema({
    ...defaultSchema,
    domain: {
        type: String
    },
    identifier: {
        type: String
    },
    password: {
        type: String
    },
    iv: {
        type: String
    }
});

Credentials.attachSchema(Credentials.schema);

Credentials.helpers({
    isOwner(userId) {
        return this.ownerId = userId;
    },
});
