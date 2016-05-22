AutoForm.addHooks('credentialsAdd', {
    onSubmit: function(doc) {
        this.event.preventDefault();
        var self = this;
        var password = doc.password;

        //Encrypt password
    },
    onSuccess: function() {
        throwAlert('Credentials successfully added', 'success');
        Router.go('credentials');
    }
});