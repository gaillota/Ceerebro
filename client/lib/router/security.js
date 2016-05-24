var onBeforeHooks = {
    isLoggedIn: function() {
        if (!Meteor.userId()) {
            this.redirect('login');
        } else {
            this.next();
        }
    },
    isAdmin: function() {
        if (!Meteor.userId()) {
            this.redirect('login');
        } else {
            if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
                throwAlert("You can't access this section !");
                this.redirect('index');
            } else {
                this.next();
            }
        }
    }
};

// User must be logged in routes
Router.onBeforeAction(onBeforeHooks.isLoggedIn, {
    except: 'register verify.email login'.split(' ')
});
