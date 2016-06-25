import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { check } from 'meteor/check';

import { Credentials } from '../credentials';

Meteor.publish('credentials', function credentials() {
    if (!this.userId) {
        return this.ready();
    }

    Counts.publish(this, 'totalCredentials', Credentials.find({ owner: this.userId }));

    return Credentials.find({
        owner: this.userId
    }, {
        sort: {
            createdAt: -1
        }
    });
});

Meteor.publish('credentials.edit', function credentialsEdit(credentialsId) {
    check(credentialsId, String);
    if (!this.userId) {
        return this.ready();
    }

    return Credentials.find({
        _id: credentialsId,
        owner: this.userId
    });
});