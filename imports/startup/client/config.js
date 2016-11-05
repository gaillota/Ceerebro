import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {sAlert} from "meteor/juliancwirko:s-alert";
import {NProgress} from 'meteor/mrt:nprogress';
import {_} from 'lodash';

import {Notification} from '../services/notification.service.js';

// SimpleSchema errors overridden
SimpleSchema.messages({
    required: "[label] is required",
    minString: "[label] must be at least [min] characters",
    maxString: "[label] can't be more than [max] characters",
    minNumber: "[label] must have a minimum value of [min]",
    maxNumber: "[label] can't exceed [max]",
    minDate: "[label] can't be before [min]",
    maxDate: "[label] can't be after the [max]",
    badDate: "[label] is not a valid date",
    noDecimal: "[label] must be an integer",
    notAllowed: "[value] is not allowed",
    notUnique: "[value] is already taken",
    notValid: "[label] is not valid",
    passwordMismatch: "The passwords don't match",
    regEx: [
        {exp: SimpleSchema.RegEx.Url, msg: "[value] is not a valid URL"},
        {exp: SimpleSchema.RegEx.Email, msg: "[label] must be a valid e-mail address"}
    ],
    keyNotInSchema: "[key] is not allowed by the schema"
});

// Disabling autoform default theme
AutoForm.setDefaultTemplate('plain');

// Autoform error hook
AutoForm.addHooks(null, {
    onError: function (formType, error) {
        //Alert is already displayed on form
        if (formType == 'pre-submit validation') {
            return;
        }

        Notification.error(error.toString());
    }
});

// Alerts configuration
sAlert.config({
    effect: 'scale',
    position: 'bottom-right',
    onRouteClose: false
});

// Hide spinner for NProgress bar
NProgress.configure({
    showSpinner: false
});
