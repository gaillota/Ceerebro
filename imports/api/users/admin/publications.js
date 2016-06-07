Meteor.publishComposite('admin.accounts', {
    find: function() {
        if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
            log('admin.accounts - Access denied');
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