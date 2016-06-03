Template.navbar.events({
    'click .js-logout': function(event) {
        event.preventDefault();

        Meteor.logout(function(error) {
            if (error) {
                toastr.error(error.toString());
            } else {
                removeMasterKey();
                FlowRouter.go('index');
            }
        });
    }
});