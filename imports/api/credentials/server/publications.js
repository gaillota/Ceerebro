import {Meteor} from 'meteor/meteor';
import {Counts} from 'meteor/tmeasday:publish-counts';

import {Credentials} from '../credentials';

Meteor.publishComposite('credentials', () => {
    return {
        find() {
            return !this.userId ? this.ready() : Credentials.find({ownerId: this.userId}, {sort: {createdAt: -1}});
        }
    };
});

Meteor.publishComposite('credential', (credentialsId) => {
    return {
        find() {
            return !this.userId ? this.ready() : Credentials.find({_id: credentialsId, ownerId: this.userId});
        }
    };
});
