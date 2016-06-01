Template.navbar.events({
    'click .js-logout': function(event) {
        event.preventDefault();

        Meteor.logout(function(error) {
            if (error) {
                notify(error.toString());
            } else {
                removeMasterKey();
                FlowRouter.go('index');
            }
        });
    }
});