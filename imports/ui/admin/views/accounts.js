import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Counts } from 'meteor/tmeasday:publish-counts';

import './accounts.html';

Template.adminAccounts.onCreated(function() {
    this.subscribe('admin.accounts');
});

Template.adminAccounts.helpers({
    usersCount: function() {
        // Subtract current user from users count
        return Counts.get('totalAccounts');
    },
    users: function() {
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
    userConnectionStatus: function() {
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
    credentialsCount: function() {
        return this.credentials().count();
    },
    isDisabled: function() {
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
    'click .js-status-toggle': function() {
        Meteor.call('changeUserStatus', this._id);
    }
});