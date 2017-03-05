import {Meteor} from 'meteor/meteor';

import {Folders} from '../folders';

Meteor.publishComposite('folder', (folderId) => {
    if (!this.userId) {
        return;
    }

    return {
        find() {
            return Folders.find({_id: folderId, ownerId: this.userId});
        }
    };
});

Meteor.publishComposite('folders.in', (folderId) => {
    if (!this.userId) {
        return;
    }

    return {
        find() {
            return Folders.find({parentId: folderId || {$exists: false}, ownerId: this.userId});
        }
    };
});
