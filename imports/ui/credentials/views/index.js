import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';
import { toastr } from 'meteor/chrismbeckett:toastr';

import './index.html';
import { Credentials } from '';

var scrollTriggerHeight = 100;
var credentialsIncrement = 10;

Template.credentials.hooks({
    created: function() {
        Meteor.subscribe('credentials');
    }
});

Template.credentials.helpers({
    countCredentials: function() {
        return Counts.get('totalCredentials');
    },
    credentials: function() {
        return Credentials.find({
            owner: Meteor.userId()
        }, {
            sort: {
                domain: 1
            }
        });
    },
    editButtonState: function() {
        return Session.get('masterKey') ? '' : 'disabled';
    }
});

Template.credentials.events({
    'click .js-credentials-see': function() {
        var masterKey = Session.get('masterKey');
        if (!masterKey) {
            Session.set('passwordOnHold', this._id);
            Modal.show('masterPasswordModal');
            return;
        }

        Modal.show('showCredentialsModal', this._id);
    },
    'click .js-credentials-remove': function() {
        if (confirm('Are you sure ?')) {
            Meteor.call('removeCredentials', this._id, function(error) {
                if (error) {
                    toastr.error(error.toString());
                }
            });
        }
    }
});