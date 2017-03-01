import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const VerifyPasswordForm = new SimpleSchema({
    password: {
        type: String,
        label: 'Your password',
        autoform: {
            type: 'password',
            autofocus: ''
        }
    }
});
