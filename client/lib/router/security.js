FlowRouter.triggersFunctions = {
    isLoggedIn: function(context, redirect) {
        if (!Meteor.userId()) {
            redirect('login');
        }
    },
    isAdmin: function(context, redirect) {
        if (!Meteor.userId()) {
            redirect('login');
        } else {
            if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
                notify("You must be admin to access this section !");
                redirect('index');
            }
        }
    },
    clearAlerts: function() {
        Alerts.remove({
            acrossRoute: {
                $ne: true
            }
        });
    }
};

// User must be logged in routes
FlowRouter.triggers.enter(FlowRouter.triggersFunctions.isLoggedIn, {
    except: 'register verify.email login about'.split(' ')
});

// Clear alerts when route changes
FlowRouter.triggers.exit(FlowRouter.triggersFunctions.clearAlerts);