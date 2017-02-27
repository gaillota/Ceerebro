import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

import {denyAll, defaultSchema, countSchema} from '../common';

export const Folders = new Mongo.Collection("folders");

// Deny all client-side access (management through methods)
Folders.deny(denyAll);

Folders.schema = new SimpleSchema({
    ...defaultSchema,
    name: {
        type: String,
        max: 255
    },
    ownerId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoValue: function() {
            if (this.isInsert && !this.isSet) {
                return Meteor.userId();
            }
        },
        denyUpdate: true
    },
    parentId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    },
    foldersCount: countSchema,
    filesCount: countSchema
});

Folders.attachSchema(Folders.schema);

Folders.helpers({
    isOwner(userId) {
        return this.ownerId = userId;
    },
    parentFolder() {
        return Folders.findOne(this.parentId);
    }
});
