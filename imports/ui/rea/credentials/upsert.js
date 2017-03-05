import {Template} from 'meteor/templating';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {AutoForm} from 'meteor/aldeed:autoform';

import {NotificationService, EncryptionService} from '../../../startup/services';
import {Credentials} from '../../../api/credentials/credentials';
import {CredentialsForm} from '../../../startup/common/forms/credentials/credentials.form';
import {upsert} from '../../../api/credentials/methods';

import './upsert.html';

const templateName = 'rea.credentials.upsert';

Template[templateName].onCreated(function () {
    this.getCredentialsId = () => FlowRouter.getParam('credentialsId');

    this.autorun(() => {
        this.subscribe('credential', this.getCredentialsId());
    });
});

Template[templateName].helpers({
    action() {
        return Template.instance().getCredentialsId() && 'Edit' || 'Add'
    },
    credentialsForm() {
        return CredentialsForm;
    },
    credentials() {
        const credentials = Credentials.findOne(Template.instance().getCredentialsId());
        if (!credentials) {
            return;
        }
        credentials.password = EncryptionService.decryptPassword({encryptedPassword: credentials.password, iv: credentials.iv});

        return credentials;
    }
});

AutoForm.addHooks('rea.credentials.upsert.form', {
    onSubmit(doc) {
        this.event.preventDefault();

        doc.iv = doc.iv || EncryptionService.generateKey({size: 128});
        doc.password = EncryptionService.encryptPassword({password: doc.password, iv: doc.iv});
        doc.credentialsId = FlowRouter.getParam('credentialsId');

        upsert.call(doc, this.done);
    },
    onSuccess() {
        NotificationService.success('Credentials edited');
        FlowRouter.go('rea.credentials.index');
    },
});
