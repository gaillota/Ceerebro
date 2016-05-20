Template.navbar.helpers({
    photo: function() {
        return Photos.findOne(Meteor.user().profile.photo) || { url: '/img/defaultPhoto.png' };
    },
    notifications: function() {
        return Notifications.find({}, {
            sort: {
                createdAt: -1
            }
        });
    }
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
    }
});