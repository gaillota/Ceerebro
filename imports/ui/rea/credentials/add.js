import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {Session} from 'meteor/session';
import {Modal} from 'meteor/peppelg:bootstrap-3-modal';

import {Notification} from '../../../startup/services/notification.service.js';

import './add.html';

import {CredentialsForm} from '../../../startup/forms/credentials/CredentialsForm';
import {EncryptionService} from '../../../startup/services/encryption.service.js';

import {insert} from '../../../api/credentials/methods';

import '../../components/master-password.modal';

Template["rea.credentials.add"].helpers({
    credentialsForm() {
        return CredentialsForm;
    }
});

Template["rea.credentials.add"].events({
    'click .js-set-key'(event) {
        if (!Session.get('masterKey')) {
            event.preventDefault();
            Modal.show('masterPasswordModal');
        }
    }
});

AutoForm.addHooks('rea.credentials.add', {
    onSubmit(doc) {
        this.event.preventDefault();

        const password = doc.password;
        const masterKey = Session.get('masterKey');

        if (!masterKey) {
            this.done(new Meteor.Error('Cannot encrypt data. Master key missing'));
            return;
        }

        doc.iv = EncryptionService.generateKey(128);
        doc.password = EncryptionService.encrypt(password, masterKey, doc.iv);

        insert.call(doc, this.done);
    },
    onSuccess() {
        Notification.success('Credentials successfully added');
        FlowRouter.go('rea.credentials.index');
    }
});