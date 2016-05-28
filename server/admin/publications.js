Meteor.publish('admin.accounts', function() {
    if (!this.userId || !isAdmin()) {
        return this.ready();
    }

    Counts.publish(this, 'totalAccounts', Meteor.users.find());
    return Meteor.users.find({
        _id: {
            $ne: this.userId
        }
    });
});