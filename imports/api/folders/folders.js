import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

import {denyAll, defaultSchema, countSchema} from '../common';
import {idSchema} from '../helpers';

export const Folders = new Mongo.Collection("folders");

// Deny all client-side access (management through methods)
Folders.deny(denyAll);

Folders.schema = new SimpleSchema({
    ...defaultSchema(),
    name: {
        type: String,
        max: 255
    },
    ...idSchema("parentId"),
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
    },
    files() {
        return Files.collection.find({
            "meta.folderId": this._id,
            "meta.ownerId": this.ownerId
        });
    },
    folders() {
        return Folders.find({
            ownerId: this.ownerId,
            parentId: this._id
        });
    }
});
