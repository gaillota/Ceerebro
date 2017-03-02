import {Template} from 'meteor/templating';
import {AutoForm} from 'meteor/aldeed:autoform';

import {NotificationService} from '../../../startup/services';
import {RegistrationForm} from '../../../startup/common/forms/auth/registration.form';

import './register.html';

const templateName = 'public.auth.register';

Template[templateName].helpers({
    registrationForm() {
        return RegistrationForm;
    }
});

AutoForm.addHooks('public.auth.register.form', {
    onSuccess() {
        NotificationService.success('Registration successful ! Check your e-mails');
    }
});
