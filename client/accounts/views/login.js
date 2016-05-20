AutoForm.addHooks('loginForm', {
    onSubmit: function(doc) {
        this.event.preventDefault();
        var self = this;

        Meteor.loginWithPassword(doc.email, doc.password, function(error) {
            self.done(error);
        });
    },
    onSuccess: function() {
        Router.go('index');
    }
});