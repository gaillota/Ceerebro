import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Counts} from 'meteor/tmeasday:publish-counts';
import {Roles} from 'meteor/alanning:roles';

import './users.html';

import {Credentials} from "../../../api/credentials/credentials";

import {activate, toggleStatus, makeAdmin} from '../../../api/users/methods';
import {Notification} from "../../../startup/services/notification.service";

Template["admin.users"].onCreated(function adminAccountsCreated() {
    this.subscribe('admin.users');
});

Template["admin.users"].helpers({
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
        return Credentials.find({
            owner: this._id
        }).count();
    },
    adminTag() {
        return Roles.userIsInRole(this._id, 'admin') && 'is-info';
    },
    emailNotVerified() {
        return !this.emails[0].verified;
    },
    statusButtonColor() {
        return !!this.disabled ? 'is-success' : 'is-danger';
    },
    statusButtonText() {
        return !!this.disabled ? 'Unban' : 'Ban';
    },
    notAdmin() {
        return !Roles.userIsInRole(this._id, 'admin');
    }
});

Template["admin.users"].events({
    'click .js-status-toggle'() {
        toggleStatus.call({userId: this._id}, (error) => {
            if (error) {
                Notification.error(error.toString);
            }
        });
    },
    'click .js-activate'() {
        activate.call({userId: this._id}, (error) => {
            if (error) {
                Notification.error(error.toString);
            }
        });
    },
    'click .js-make-admin'() {
        makeAdmin.call({userId: this._id}, (error) => {
            if (error) {
                Notification.error(error.toString());
            }
        });
    }
});