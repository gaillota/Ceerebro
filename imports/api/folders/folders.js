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
        regEx: SimpleSchema.RegEx.Id
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
        return this.owner = userId;
    },
    parentFolder() {
        return Folders.findOne(this.parentId);
    }
});