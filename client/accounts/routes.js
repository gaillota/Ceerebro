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
                toastr.error(error.toString());
            } else {
                toastr.success('Your account is now activated. Thanks !');
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
