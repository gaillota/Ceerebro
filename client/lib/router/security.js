FlowRouter.triggersFunctions = {
    isLoggedIn: function(context, redirect) {
        if (!Meteor.userId()) {
            redirect('login');
        }
    },
    isAdmin: function(context, redirect) {
        log('trigger to check if user is admin');
        if (!Meteor.userId()) {
            redirect('login');
        } else {
            if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
                log('user aint no admin');
                throwAlert("You must be admin to access this section !");
                redirect('index');
            }
        }
    },
    clearAlerts: function() {
        Alerts.remove({});
    }
};

// User must be logged in routes
FlowRouter.triggers.enter(FlowRouter.triggersFunctions.isLoggedIn, {
    except: 'register verify.email login about'.split(' ')
});

//FlowRouter.triggers.enter(triggers.isAdmin, {
//    only: 'admin admin.accounts'.split(' ')
//});

// Clear alerts when route changes
FlowRouter.triggers.enter(FlowRouter.triggersFunctions.clearAlerts, {
    only: 'login register'.split(' ')
});