import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Roles } from 'meteor/alanning:roles';
import { toastr } from 'meteor/chrismbeckett:toastr';

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