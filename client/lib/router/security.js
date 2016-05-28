var triggers = {
    isLoggedIn: function(context, redirect) {
        if (!Meteor.userId()) {
            redirect('login');
        }
    },
    //isAdmin: function(context, redirect) {
    //    if (!Meteor.userId()) {
    //        redirect('login');
    //        stop();
    //    } else {
    //        if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
    //            throwAlert("You can't access this section !");
    //            redirect('index');
    //        }
    //    }
    //},
    clearAlerts: function() {
        Alerts.remove({});
    }
};

// User must be logged in routes
FlowRouter.triggers.enter(triggers.isLoggedIn, {
    except: 'register verify.email login'.split(' ')
});

// Clear alerts when route changes
FlowRouter.triggers.exit(triggers.clearAlerts, {
    only: 'login'.split(' ')
});