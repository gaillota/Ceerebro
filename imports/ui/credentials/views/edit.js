import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';
import { toastr } from 'meteor/chrismbeckett:toastr';

import { Credentials } from '';
import { EncryptionService } from '../../global/services/EncryptionService.js';

import './edit.html';

import { CredentialsForm } from '../forms/CredentialsForm.js';

Template.credentialsEdit.helpers({
    credentialsForm: function() {
        return CredentialsForm;
    },
    credentials: function() {
        var credentialsId = FlowRouter.getParam('credentialsId');
        var credentials = Credentials.findOne(credentialsId);
        if (!credentials) {
            return;
        }
        var masterKey = Session.get('masterKey');
        var plainPassword = EncryptionService.decrypt(credentials.password, masterKey, credentials.iv);

        return {
            domain: credentials.domain,
            identifier: credentials.identifier,
            password: plainPassword
        }
    }
});

AutoForm.addHooks('editCredentials', {
    onSubmit: function(doc) {
        this.event.preventDefault();
        var self = this;

        var masterKey = Session.get('masterKey');

        if (!masterKey) {
            this.done(new Meteor.Error('Cannot encrypt data. Master key missing'));
            return;
        }

        var credentialsId = FlowRouter.getParam('credentialsId');
        var credential = Credentials.findOne(credentialsId);

        if (!credential) {
            this.done(new Meteor.Error('Credentials not found, could not save'));
            return;
        }

        doc.password = EncryptionService.encrypt(doc.password, masterKey, credential.iv);

        Meteor.call("editCredentials", credentialsId, doc, function(error) {
            self.done(error);
        });
    },
    onSuccess: function() {
        toastr.success('Credentials edited');
        FlowRouter.go('credentials');
    }
});