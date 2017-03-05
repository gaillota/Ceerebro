import {Meteor} from 'meteor/meteor';

import {FolderRepository} from '../../../startup/repositories';

Meteor.publishComposite('folder', (folderId) => {
    return {
        find() {
            if (!this.userId) {
                return;
            }

            return FolderRepository.findFolder({folderId, ownerId: this.userId});
        }
    };
});

Meteor.publishComposite('folders.in', (folderId) => {
    return {
        find() {
            if (!this.userId) {
                return;
            }

            return FolderRepository.findFoldersIn({
                folderId,
                ownerId: this.userId
            });
        }
    };
});
