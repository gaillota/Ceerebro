import {Meteor} from 'meteor/meteor';
import {Roles} from 'meteor/alanning:roles';
import {Counts} from 'meteor/tmeasday:publish-counts';

import {Credentials} from '../../credentials/credentials';

// Publish user's keychain to client
Meteor.publish(null, function userKeychain() {
    if (!this.userId) {
        return this.ready();
    }

    return Meteor.users.find({
        _id: this.userId
    }, {
        fields: {
            createdAt: 1,
            keychain: 1
        }
    });
});

Meteor.publishComposite('admin.users', {
    find() {
        if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
            return this.ready();
        }

        const QUERY_FILTER = {_id: {$ne: this.userId}};
        return Meteor.users.find(QUERY_FILTER);
    },
    children: [
        {
            find(user) {
                return Credentials.find({
                    ownerId: user._id
                }, {
                    fields: {
                        ownerId: 1
                    }
                });
            }
        }
    ]
});

Meteor.publish('count.users', function countAdminUsers() {
    const QUERY_FILTER = {roles: {$nin: ['admin']}};

    Counts.publish(this, 'count.users', Meteor.users.find(QUERY_FILTER));
});

Meteor.publish('count.admin.users', function countAdminUsers() {
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
        return this.ready();
    }

    const QUERY_FILTER = {_id: {$ne: this.userId}};

    Counts.publish(this, 'count.admin.users', Meteor.users.find(QUERY_FILTER));
});
