FlowRouter.route('/register', {
    name: 'register',
    action: function() {
        BlazeLayout.render('layout', { page: 'register' });
    }
});

FlowRouter.route('/verify-email/:token', {
    name: 'verify.email',
    action: function(params) {
        Accounts.verifyEmail(params.token, function(error) {
            if (error) {
                notify(error.toString(), 'danger', true);
            } else {
                notify('Your account is now activated. Thanks !', 'success', true);
            }
            FlowRouter.go('index');
        });
    }
});

FlowRouter.route('/login', {
    name: 'login',
    action: function() {
        BlazeLayout.render('layout', { page: 'login' });
    }
});
