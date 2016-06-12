import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Credentials } from '../../credentials/credentials.js';

// Publish user's keychain to client
Meteor.publish(null, function() {
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

Meteor.publishComposite('admin.accounts', {
    find: function() {
        if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
            return this.ready();
        }

        const QUERY_FILTER = { _id: { $ne: this.userId } };

        Counts.publish(this, 'totalAccounts', Meteor.users.find(QUERY_FILTER));
        return Meteor.users.find(QUERY_FILTER);
    },
    children: [
        {
            find: function(user) {
                return Credentials.find({
                    owner: user._id
                }, {
                    fields: {
                        owner: 1
                    }
                });
            }
        }
    ]
});