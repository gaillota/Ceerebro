Meteor.methods({
    insertCredentials: function (credentials) {
        checkUser();

        credentials.owner = Meteor.userId();
        Credentials.insert(credentials);
    },
    editCredentials: function(credentialsId, doc) {
        checkUser();

        const credentials = Credentials.findOne(credentialsId);

        if (!credentials) {
            throw new Meteor.Error(404, 'Credentials not found');
        }

        if (!credentials.isOwner(Meteor.userId())) {
            throw new Meteor.Error(403, 'You can only edit your own credentials.');
        }

        Credentials.update({
            _id: credentialsId
        }, {
            $set: {
                domain: doc.domain,
                identifier: doc.identifier,
                password: doc.password
            }
        });
    },
    removeCredentials: function (credentialsId) {
        checkUser();
        check(credentialsId, String);

        const credentials = Credentials.findOne(credentialsId);

        if (!credentials) {
            throw new Meteor.Error(404, 'Credentials not found');
        }

        if (!credentials.isOwner(Meteor.userId())) {
            throw new Meteor.Error(403, 'You can only remove your own credentials.');
        }

        Credentials.remove(credentialsId);
    }
});