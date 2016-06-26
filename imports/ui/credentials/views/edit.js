import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';

import { NotificationService } from '../../../startup/services/notification.service.js';
import { Credentials } from '../../../api/credentials/credentials';

import './edit.html';

import { schema as CredentialsForm } from '../../../startup/forms/credentials/CredentialsForm';
import { EncryptionService } from '../../../startup/services/encryption.service';
import { update } from '../../../api/credentials/methods';

Template.credentialsEdit.helpers({
    credentialsForm() {
        return CredentialsForm;
    },
    credentials() {
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
    onSubmit(doc) {
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

        update.call({ credentialsId: credentialsId, doc: credential }, (error) => {
            self.done(error);
        });
    },
    onSuccess() {
        NotificationService.success('Credentials edited');
        FlowRouter.go('credentials');
    }
});