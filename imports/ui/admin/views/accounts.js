import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Counts } from 'meteor/tmeasday:publish-counts';

import './accounts.html';

Template.adminAccounts.onCreated(function adminAccountsCreated() {
    this.subscribe('admin.accounts');
});

Template.adminAccounts.helpers({
    usersCount() {
        // Subtract current user from users count
        return Counts.get('totalAccounts');
    },
    users() {
        return Meteor.users.find({
            _id: {
                $ne: Meteor.userId()
            }
        }, {
            sort: {
                createdAt: 1
            }
        });
    },
    userConnectionStatus() {
        if (!this.status) {
            return 'gray';
        } else {
            if (this.status.online) {
                return '#5cb85c';
            } else if (this.status.idle) {
                return '#f0ad4e';
            } else {
                return 'gray';
            }
        }
    },
    credentialsCount() {
        return this.credentials().count();
    },
    isDisabled() {
        return !!this.disabled;
    }
    //userStatusAction: function() {
    //    return !!this.disabled ? {
    //        actionButton: 'success',
    //        actionIcon: 'check',
    //        actionLabel: 'Enable'
    //    } : {
    //        actionButton: 'danger',
    //        actionIcon: 'user-times',
    //        actionLabel: 'Disable'
    //    }
    //}
});

Template.adminAccounts.events({
    'click .js-status-toggle'() {
        Meteor.call('changeUserStatus', this._id);
    }
});