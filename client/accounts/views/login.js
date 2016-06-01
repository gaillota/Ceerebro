AutoForm.addHooks('loginForm', {
    onSubmit: function(doc) {
        this.event.preventDefault();
        var self = this;

        Meteor.loginWithPassword(doc.email, doc.password, function(error) {
            self.done(error);
        });
    },
    onSuccess: function() {
        if (Meteor.user()) {
            notify('Welcome back ' + Meteor.user().username + ' ! :)', 'success', true);
        }
        FlowRouter.go('index');
    }
});