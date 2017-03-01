import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

import {denyAll, defaultSchema} from '../common';

export const Readings = new Mongo.Collection("readings");

// Deny all client-side access (management through methods)
Readings.deny(denyAll);

Readings.schema = new SimpleSchema({
    ...defaultSchema(),
    value: {
        type: Number,
        decimal: true,
        min: 0
    }
});

Readings.attachSchema(Readings.schema);

Readings.helpers({
    isOwner(userId) {
        return this.ownerId = userId;
    }
});
