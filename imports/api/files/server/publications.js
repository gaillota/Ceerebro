import {Meteor} from 'meteor/meteor';

import {Files} from '../files';

Meteor.publishComposite('files.in', (folderId) => {
    return {
        find() {
            return !this.userId ? this.ready() : Files.collection.find({userId: this.userId, "meta.folderId": folderId});
        }
    };
});
