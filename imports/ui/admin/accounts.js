import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Counts } from 'meteor/tmeasday:publish-counts';

import './accounts.html';

import { activate } from '../../api/users/methods';
import { toggleStatus } from '../../api/users/methods';

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
                createdAt: -1
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
    emailNotVerified() {
        return !this.emails[0].verified;
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
        toggleStatus.call({ userId: this._id }, (error) => {
            // Display error
        });
    },
    'click .js-activate'() {
        activate.call({ userId: this._id }, (error) => {
            // Display error
        });
    }
});