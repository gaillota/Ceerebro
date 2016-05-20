Router.map(function() {
    // Register
    this.route('/register', {
        name: 'register'
    });
    // Reset password
    this.route('/verify-email/:token', {
        action: function() {
            Accounts.verifyEmail(this.params.token, function(error) {
                if (error) {
                    throwAlert(error.reason);
                } else {
                    throwAlert('Your account is now activated. Thanks !', 'success');
                }
                Router.go('index');
            });
        }
    });
    // Login
    this.route('/login', {
        // Only route without default template
        layoutTemplate: 'login'
    });
    this.route('/change-password', {
        name: 'change.password'
    });
});
