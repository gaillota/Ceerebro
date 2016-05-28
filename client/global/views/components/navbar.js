Template.navbar.events({
    'click .js-logout': function(event) {
        event.preventDefault();

        Meteor.logout(function(error) {
            if (error) {
                throwAlert(error.reason);
            } else {
                removeMasterKey();
                FlowRouter.go('index');
            }
        });
    }
});