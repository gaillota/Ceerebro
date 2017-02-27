import {Template} from 'meteor/templating';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {AutoForm} from 'meteor/aldeed:autoform';

import {Notification} from '../../../startup/services/notification.service.js';
import {Credentials} from '../../../api/credentials/credentials';
import {CredentialsForm} from '../../../startup/forms/credentials/CredentialsForm';
import {EncryptionService} from '../../../startup/services/encryption.service.js';
import {upsert} from '../../../api/credentials/methods';

import './upsert.html';

const templateName = "rea.credentials.upsert";

Template[templateName].onCreated(function reaCredentialsEditCreated() {
    this.getCredentialsId = () => FlowRouter.getParam('credentialsId');

    this.autorun(() => {
        this.subscribe('credential', this.getCredentialsId());
    });
});

Template[templateName].helpers({
    credentialsForm() {
        return CredentialsForm;
    },
    credentials() {
        const credentials = Credentials.findOne(Template.instance().getCredentialsId());
        if (!credentials) {
            return;
        }
        credentials.password = EncryptionService.decrypt(credentials.password, credentials.iv);

        return credentials;
    }
});

AutoForm.addHooks('manageCredentials', {
    onSubmit(doc) {
        this.event.preventDefault();

        doc.iv = doc.iv || EncryptionService.generateKey(128);
        doc.password = EncryptionService.encrypt(doc.password, doc.iv);
        doc.credentialsId = FlowRouter.getParam('credentialsId');

        upsert.call(doc, this.done);
    },
    onSuccess() {
        Notification.success('Credentials edited');
        FlowRouter.go('rea.credentials.index');
    },
});
