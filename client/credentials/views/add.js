AutoForm.addHooks('credentialsForm', {
    onSubmit: function(doc) {
        this.event.preventDefault();
        var self = this;
        var password = doc.password;


    },
    onSuccess: function() {
        throwAlert('Credentials successfully added', 'success');
        Router.go('index');
    }
});