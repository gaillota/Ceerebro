Meteor.publish('credentials', function() {
    if (!this.userId) {
        return this.ready();
    }

    return Credentials.find({
        owner: this.userId
    });
});