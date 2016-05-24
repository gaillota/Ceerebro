Template.navbar.helpers({
});

Template.navbar.events({
    'click .js-logout': function(event) {
        event.preventDefault();

        Meteor.logout(function(error) {
            if (error) {
                throwAlert(error.reason);
            } else {
                Router.go('index');
            }
        });
    },
    'click .js-set-key': function(event) {
        event.preventDefault();

        Modal.show('masterPasswordModal');
    },
    'click .js-forget-key': function(event) {
        event.preventDefault();

        Session.set('masterKey', undefined);
    }
});