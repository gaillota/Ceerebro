import {Template} from 'meteor/templating';
import {AutoForm} from 'meteor/aldeed:autoform';

import {Notification} from '../../../startup/services/notification.service.js';

import './register.html';

import {RegistrationForm} from '../../../startup/forms/auth/RegistrationForm';

AutoForm.addHooks('public.auth.register', {
    onSuccess() {
        Notification.success('Registration successful ! Check your e-mails');
    }
});

Template["public.auth.register"].helpers({
    registrationForm() {
        return RegistrationForm;
    }
});