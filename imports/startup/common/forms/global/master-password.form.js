import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const MasterPasswordForm = new SimpleSchema({
    password: {
        type: String,
        label: "Your password",
        autoform: {
            type: "password",
            autofocus: ''
        }
    }
});