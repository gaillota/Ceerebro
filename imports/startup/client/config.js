import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { AutoForm } from 'meteor/aldeed:autoform';
import { toastr } from 'meteor/chrismbeckett:toastr';
import { NProgress } from 'meteor/settinghead:auto-nprogress';

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
    passwordMismatch: "The two passwords don't match",
    regEx: [
        { exp: SimpleSchema.RegEx.Url, msg: "[value] is not a valid URL"},
        { exp: SimpleSchema.RegEx.Email, msg: "[label] must be a valid e-mail address" }
    ],
    keyNotInSchema: "[key] is not allowed by the schema"
});

// Autoform error hook
AutoForm.addHooks(null, {
    onError: function (formType, error) {
        //Alert is already displayed on form
        if (formType == 'pre-submit validation') {
            return;
        }

        toastr.error(error.toString());
    }
});

// Hide spinner for NProgress bar
NProgress.configure({
    showSpinner: false
});

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "1000",
    "hideDuration": "1000",
    "timeOut": "3500",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};