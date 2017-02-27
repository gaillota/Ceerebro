import {Meteor} from 'meteor/meteor';

import {Folders} from '../folders';

Meteor.publishComposite('folder', (folderId) => {
    return {
        find() {
            return !this.userId ? this.ready() : Folders.find({_id: folderId, ownerId: this.userId});
        }
    };
});

Meteor.publishComposite('folders.in', (folderId) => {
    return {
        find() {
            return !this.userId ? this.ready() : Folders.find({parentId: folderId || {$exists: false}, ownerId: this.userId});
        }
    };
});
