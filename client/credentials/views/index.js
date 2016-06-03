Template.credentials.helpers({
    countCredentials: function() {
        return Credentials.find({
            owner: Meteor.userId()
        }).count();
    },
    credentials: function() {
        return Credentials.find({
            owner: Meteor.userId()
        }, {
            sort: {
                domain: 1
            }
        });
    },
    editButtonState: function() {
        return Session.get('masterKey') ? '' : 'disabled';
    }
});

Template.credentials.events({
    'click .js-credentials-see': function() {
        var masterKey = Session.get('masterKey');
        if (!masterKey) {
            Session.set('passwordOnHold', this._id);
            Modal.show('masterPasswordModal');
            return;
        }

        Modal.show('showCredentialsModal', this._id);
    },
    'click .js-credentials-remove': function() {
        if (confirm('Are you sure ?')) {
            Meteor.call('removeCredentials', this._id, function(error) {
                if (error) {
                    toastr.error(error.toString());
                }
            });
        }
    }
});