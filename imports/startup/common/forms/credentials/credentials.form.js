import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const CredentialsForm = new SimpleSchema({
    domain: {
        type: String,
        label: 'Domain',
        autoform: {
            type: 'url',
            autofocus: '',
            autocomplete: 'off'
        }
    },
    identifier: {
        type: String,
        label: 'Identifier',
        autoform: {
            type: 'email',
            autocomplete: 'off'
        }
    },
    password: {
        type: String,
        label: 'Password',
        autoform: {
            type: 'password'
        }
    }
});
