import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {Session} from 'meteor/session';
import {Modal} from 'meteor/peppelg:bootstrap-3-modal';

import {Notification} from '../../../startup/services/notification.service.js';
import {Credentials} from '../../../api/credentials/credentials';

import './edit.html';

import {CredentialsForm} from '../../../startup/forms/credentials/CredentialsForm';
import {EncryptionService} from '../../../startup/services/encryption.service.js';
import {update} from '../../../api/credentials/methods';

Template["rea.credentials.edit"].onCreated(function reaCredentialsEditCreated() {
    this.getCredentialsId = () => FlowRouter.getParam('credentialsId');

    this.autorun(() => {
        this.subscribe('credentials.edit', this.getCredentialsId());
    });
});

Template["rea.credentials.edit"].helpers({
    credentialsForm() {
        return CredentialsForm;
    },
    credentials() {
        const credentialsId = Template.instance().getCredentialsId();
        const credentials = Credentials.findOne(credentialsId);
        if (!credentials) {
            return;
        }
        const masterKey = Session.get('masterKey');
        const plainPassword = EncryptionService.decrypt(credentials.password, masterKey, credentials.iv);

        return {
            domain: credentials.domain,
            identifier: credentials.identifier,
            password: plainPassword
        }
    }
});

AutoForm.addHooks('rea.credentials.edit', {
    onSubmit(doc) {
        this.event.preventDefault();

        const masterKey = Session.get('masterKey');

        if (!masterKey) {
            this.done(new Meteor.Error('Cannot encrypt data. Master key missing'));
            return;
        }

        const credentialsId = FlowRouter.getParam('credentialsId');
        const credential = Credentials.findOne(credentialsId);

        if (!credential) {
            this.done(new Meteor.Error('Credentials not found, could not save'));
            return;
        }

        doc.password = EncryptionService.encrypt(doc.password, masterKey, credential.iv);
        doc.credentialsId = credentialsId;

        update.call(doc, this.done);
    },
    onSuccess() {
        Notification.success('Credentials edited');
        FlowRouter.go('rea.credentials.index');
    }
});