import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const Readings = new Mongo.Collection("readings");

// Deny all client-side access (management through methods)
Readings.deny({
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return true;
    }
});

Readings.schema = new SimpleSchema({
    value: {
        type: Number,
        decimal: true,
        min: 0
    },
    owner: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    createdAt: {
        type: Date,
        autoValue: function () {
            if (this.isInsert && !this.isSet) {
                return new Date();
            }
        }
    }
});

Readings.attachSchema(Readings.schema);

Readings.helpers({
    isOwner(userId) {
        return this.owner = userId;
    }
});