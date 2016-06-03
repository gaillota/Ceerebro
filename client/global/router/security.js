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
                toastr.error("You must be admin to access this section !");
                redirect('index');
            }
        }
    }
};

// User must be logged in routes
FlowRouter.triggers.enter(FlowRouter.triggersFunctions.isLoggedIn, {
    except: 'register verify.email login about'.split(' ')
});