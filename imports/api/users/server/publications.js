import { Meteor } from 'meteor/meteor';

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