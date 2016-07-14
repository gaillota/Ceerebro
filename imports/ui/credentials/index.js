import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';

import { Notification } from '../../startup/services/notification.service.js';

import './index.html';
import '../components/masterPasswordModal';
import './showCredentialsModal';

import { Credentials } from '../../api/credentials/credentials';
import { remove } from '../../api/credentials/methods';

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
            remove.call({ credentialsId: this._id }, (error) => {
                if (error) {
                    Notification.error(error.toString());
                } else {
                    Notification.success('Credentials successfully removed !')
                }
            });
        }
    }
});