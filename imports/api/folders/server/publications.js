import {Meteor} from 'meteor/meteor';

import {Folders} from '../folders';

Meteor.publishComposite('folder', (folderId) => {
    return {
        find() {
            if (!this.userId) {
                return this.ready();
            }

            return Folders.find({
                _id: folderId,
                ownerId: this.userId,
            });
        }
    };
});

Meteor.publishComposite('folders.in', (folderId) => {
    return {
        find() {
            if (!this.userId) {
                return this.ready();
            }

            return Folders.find({
                parentId: folderId,
                ownerId: this.userId,
            });
        }
    };
});
