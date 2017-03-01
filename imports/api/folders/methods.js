import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';

import {Folders} from './folders';
import {FolderForm} from '../../startup/common/forms/storage/folder.form';
import {idSchema} from '../helpers';

const mixins = ValidatedMethod.mixins;
const FOLDER_ID_REQUIRED = idSchema("folderId");
const PARENT_ID_REQUIRED = idSchema("parentId");

export const create = new ValidatedMethod({
    name: 'folders.create',
    mixins: [mixins.isLoggedIn, mixins.schema],
    schema: [FolderForm, idSchema("parentId", true)],
    run({name, parentId}) {
        const folder = {
            name
        };

        if (parentId) {
            folder.parentId = parentId
        }

        return Folders.insert(folder);
    }
});

export const update = new ValidatedMethod({
    name: 'folders.update',
    mixins: [mixins.isLoggedIn, mixins.schema, mixins.restrict, mixins.provide],
    schema: [FOLDER_ID_REQUIRED, FolderForm],
    provide: function({folderId}) {
        return Folders.findOne(folderId);
    },
    restrictions: [
        {
            condition: function(args, folder) {
                return folder.ownerId !== this.userId;
            },
            error: function() {
                return new Meteor.Error("not-authorized", "You can only modify your own folders");
            }
        }
    ],
    run({folderId, name}) {
        return Folders.update(folderId, {
            $set: {
                name
            }
        });
    }
});

export const move = new ValidatedMethod({
    name: 'folders.move',
    mixins: [mixins.isLoggedIn, mixins.schema, mixins.restrict, mixins.provide],
    schema: [FOLDER_ID_REQUIRED, PARENT_ID_REQUIRED],
    provide: function({folderId}) {
        return Folders.findOne(folderId);
    },
    restrictions: [
        {
            condition: function(args, folder) {
                return folder.ownerId !== this.userId;
            },
            error: function() {
                return new Meteor.Error("not-authorized", "You can only modify your own folders");
            }
        }
    ],
    run({folderId, parentId}) {
        return Folders.update(folderId, {
            $set: {
                parentId
            }
        });
    }
});

export const remove = new ValidatedMethod({
    name: 'folders.remove',
    mixins: [mixins.isLoggedIn, mixins.schema, mixins.restrict, mixins.provide],
    schema: [FOLDER_ID_REQUIRED],
    provide: function({folderId}) {
        return Folders.findOne(folderId);
    },
    restrictions: [
        {
            condition: function(args, folder) {
                return folder.ownerId !== this.userId;
            },
            error: function() {
                return new Meteor.Error("not-authorized", "You can only modify your own folders");
            }
        }
    ],
    run({folderId}) {
        // Update future files

        return Folders.remove(folderId);
    }
});
