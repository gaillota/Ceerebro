Meteor.publish('credentials', function(limit) {
    if (!this.userId) {
        return this.ready();
    }
    limit = limit || 20;
    check(limit, Number);

    Counts.publish(this, 'totalCredentials', Credentials.find({ owner: this.userId }));

    return Credentials.find({
        owner: this.userId
    }, {
        sort: {
            createdAt: -1
        },
        limit: limit
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