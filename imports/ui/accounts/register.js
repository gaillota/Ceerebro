import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { AutoForm } from 'meteor/aldeed:autoform';

import { Notification } from '../../startup/services/notification.service.js';

import './register.html';

import { schema as RegistrationForm } from '../../startup/forms/accounts/RegistrationForm';
import { EncryptionService } from '../../startup/services/encryption.service.js';

import { register } from '../../api/users/methods';

AutoForm.addHooks('registrationForm', {
    onSuccess() {
        Notification.success('Registration successful ! Check your e-mails');
    }
});

Template.register.helpers({
    registrationForm() {
        return RegistrationForm;
    }
});