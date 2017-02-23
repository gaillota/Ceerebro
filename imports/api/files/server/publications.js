import {Meteor} from 'meteor/meteor';

import {Files} from '../files';

Meteor.publishComposite('files.in', (folderId) => {
    return {
        find() {
            if (!this.userId) {
                return this.ready();
            }

            return Files.collection.find({
                userId: this.userId,
                "meta.folderId": folderId
            });
        }
    };
});
