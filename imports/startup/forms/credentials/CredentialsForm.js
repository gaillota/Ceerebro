import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const CredentialsForm = new SimpleSchema({
    domain: {
        type: String,
        label: 'Domain',
        regEx: SimpleSchema.RegEx.Url,
        autoform: {
            type: 'url',
            autofocus: true,
            autocomplete: false
        }
    },
    identifier: {
        type: String,
        label: 'Identifier',
        autoform: {
            type: 'email',
            autocomplete: false
        }
    },
    password: {
        type: String,
        label: 'Password',
        autoform: {
            type: 'password',
            autocomplete: false
        }
    }
});