Meteor.publish('credentials', function() {
    if (!this.userId) {
        return this.ready();
    }

    return Credentials.find({
        owner: this.userId
    });
});

Meteor.publish('credentials.edit', function(credentialsId) {
    check(credentialsId, String);
    if (!this.userId) {
        return this.ready();
    }

    return Credentials.find({
        _id: credentialsId,
        owner: this.userId
    });
});