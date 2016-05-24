Meteor.methods({
    insertCredentials: function (credentials) {
        checkUser();

        log(credentials);

        credentials.owner = Meteor.userId();
        Credentials.insert(credentials);
    },
    removeCredentials: function (credentialsId) {
        checkUser();
        check(credentialsId, String);

        const credentials = Credentials.findOne(credentialsId);

        if (!credentials) {
            throw new Meteor.Error(404, 'Credentials not found');
        }

        if (!credentials.isOwner(this.userId)) {
            throw new Meteor.Error(403, 'You can only remove your own credentials.');
        }

        Credentials.remove(credentialsId);
    }
});