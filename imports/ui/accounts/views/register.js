import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { AutoForm } from 'meteor/aldeed:autoform';

import { NotificationService } from '../../../startup/services/notification.service.js';

import './register.html';

import { schema as RegistrationForm } from '../../../startup/forms/accounts/RegistrationForm';
import { EncryptionService } from '../../../startup/services/encryption.service';

import { register } from '../../../api/users/methods';

AutoForm.addHooks('registrationForm', {
    before: {
        method() {
            NotificationService.warn('Generating your secure keychain...');
        }
    },
    onSuccess() {
        NotificationService.success('Registration successful ! Check your e-mails');
    }
});

Template.register.helpers({
    registrationForm() {
        return RegistrationForm;
    }
});