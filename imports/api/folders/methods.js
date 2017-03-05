import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';

import {Folders} from './folders';
import {FolderForm} from '../../startup/common/forms/storage/folder.form';
import {idSchema} from '../helpers';

const mixins = ValidatedMethod.mixins;
const FOLDER_ID = idSchema('folderId', true);
const FOLDER_ID_REQUIRED = idSchema('folderId');
const PARENT_ID = idSchema('parentId', true);

export const upsert = new ValidatedMethod({
    name: 'folders.upsert',
    mixins: [mixins.isLoggedIn, mixins.schema],
    schema: [FOLDER_ID, PARENT_ID, FolderForm],
    run({folderId, parentId, name}) {
        const folder = {
            name
        };

        if (parentId) {
            folder.parentId = parentId
        }

        // Separated insert and update (instead of a single upsert) because of schema cleaning
        if (folderId) {
            if (!Folders.findOne(folderId).isOwner(this.userId)) {
                throw new Meteor.Error("not-authorized", "You can only update your own folders");
            }

            return Folders.update(folderId, {
                $set: folder
            });
        }

        return Folders.insert(folder);
    }
});

export const move = new ValidatedMethod({
    name: 'folders.move',
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
