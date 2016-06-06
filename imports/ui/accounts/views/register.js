import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { AutoForm } from 'meteor/aldeed:autoform';
import { toastr } from 'meteor/chrismbeckett:toastr';
import { EncryptionService } from '../../global/services/EncryptionService.js';

import './register.html';

import { RegistrationForm } from '../forms/RegistrationForm.js';

AutoForm.addHooks('registrationForm', {
    onSubmit: function(doc) {
        this.event.preventDefault();
        var self = this;

        doc.keychain = EncryptionService.setupUserKeychain(doc.password);
        Meteor.call('registerUser', doc, function(error) {
            self.done(error);
        });
    },
    onSuccess: function() {
        toastr.success('Registration successful ! Check your e-mails');
    }
});

Template.register.helpers({
    registrationForm: function() {
        return RegistrationForm;
    }
});