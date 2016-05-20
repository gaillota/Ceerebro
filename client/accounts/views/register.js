AutoForm.addHooks('registrationForm', {
    onSuccess: function() {
        throwAlert('Registration successful ! Check your e-mails', 'success');
        Router.go('index');
    }
});