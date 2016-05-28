Template.adminAccounts.helpers({
    usersCount: function() {
        // Subtract current user from users count
        return Counts.get('totalAccounts') - 1;
    },
    users: function() {
        return Meteor.users.find({}, {
            sort: {
                createdAt: 1
            }
        });
    },
    userConnectionStatus: function() {
        if (!this.status) {
            return 'gray';
        } else {
            if (this.status.online) {
                return 'green';
            } else if (this.status.idle) {
                return 'orange';
            } else {
                return 'gray';
            }
        }
    }
});