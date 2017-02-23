import {FilesCollection} from 'meteor/ostrio:files';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import _extend from 'lodash/extend';

import {denyAll, defaultSchema} from '../common';

export const Files = new FilesCollection({
    collectionName: 'files',
    allowClientCode: false,
    storagePath: '/cdn/storage/files',
    downloadCallback: function (fileObj) {
        return this.userId && fileObj.ownerId === this.userId;
    },
    onBeforeUpload: function (file) {
        // Allow upload files under 10MB, and only in png/jpg/jpeg formats
        if (file.size <= 10485760) {
            return true;
        }
        return 'Please upload a file smaller than 10MB';
    },
    onAfterUpload: function (fileRef) {
        // TODO: Use GridFS
    }
});

Files.deny(denyAll);

const schema = _extend(Files.schema, {
    // Overriding meta property
    meta: {
        type: Object,
        blackbox: false,
        optional: false
    },
    "meta.folderId": {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        denyUpdate: true
    },
    "meta.name": {
        type: String,
        max: 60
    },
    "meta.deletedAt": {
        type: Date,
        optional: true
    },
    "meta.uploadedAt": defaultSchema.createdAt,
});

Files.collection.attachSchema(new SimpleSchema(schema));
