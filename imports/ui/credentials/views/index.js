import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';

import { NotificationService } from '../../../startup/services/notification.service.js';

import './index.html';
import { Credentials } from '../../../api/credentials/credentials';

Template.credentials.onCreated(function credentialsCreated() {
    this.subscribe('credentials');
});

Template.credentials.helpers({
    countCredentials() {
        return Counts.get('totalCredentials');
    },
    credentials() {
        return Credentials.find({
            owner: Meteor.userId()
        }, {
            sort: {
                domain: 1
            }
        });
    },
    editButtonState() {
        return Session.get('masterKey') ? '' : 'disabled';
    }
});

Template.credentials.events({
    'click .js-credentials-see'() {
        var masterKey = Session.get('masterKey');
        if (!masterKey) {
            Session.set('passwordOnHold', this._id);
            Modal.show('masterPasswordModal');
            return;
        }

        Modal.show('showCredentialsModal', this._id);
    },
    'click .js-credentials-remove'() {
        if (confirm('Are you sure ?')) {
            Meteor.call('removeCredentials', this._id, function(error) {
                if (error) {
                    NotificationService.error(error.toString());
                }
            });
        }
    }
});