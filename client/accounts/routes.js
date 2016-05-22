Router.map(function() {
    // Register
    this.route('/register', {
        name: 'register'
    });
    // Verify email
    this.route('/verify-email/:token', {
        name: 'verify.email',
        onRun: function() {
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
    // Enroll
    this.route('/enroll/:token', {
        name: 'enroll'
    });
    // Login
    this.route('/login', {
        // Only route without default template
        layoutTemplate: 'login'
    });
    // Change password
    this.route('/change-password', {
        name: 'change.password'
    });
});
