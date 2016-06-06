import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';
import { toastr } from 'meteor/chrismbeckett:toastr';
import { EncryptionService } from '../../global/services/EncryptionService.js';

import './add.html';

import { CredentialsForm } from '../forms/CredentialsForm.js';

Template.credentialsAdd.helpers({
    credentialsForm: function() {
        return CredentialsForm;
    }
});

Template.credentialsAdd.events({
    'click .js-set-key': function(event) {
        if (!Session.get('masterKey')) {
            event.preventDefault();
            Modal.show('masterPasswordModal');
        }
    }
});

AutoForm.addHooks('addCredentials', {
    onSubmit: function(doc) {
        this.event.preventDefault();
        var self = this;

        var password = doc.password;
        var masterKey = Session.get('masterKey');

        if (!masterKey) {
            this.done(new Meteor.Error('Cannot encrypt data. Master key missing'));
            return;
        }

        doc.iv = EncryptionService.generateKey(128);
        doc.password = EncryptionService.encrypt(password, masterKey, doc.iv);

        Meteor.call("insertCredentials", doc, function(error) {
            self.done(error);
        });
    },
    onSuccess: function() {
        toastr.success('Credentials successfully added', 'success', true);
        FlowRouter.go('credentials');
    }
});