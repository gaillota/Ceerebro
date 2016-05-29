// Publish user's keychain to client
Meteor.publish(null, function() {
    if (!this.userId) {
        return this.ready();
    }

    return Meteor.users.find({
        _id: this.userId
    }, {
        fields: {
            keychain: 1
        }
    });
});