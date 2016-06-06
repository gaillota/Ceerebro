import { SimpleSchema } from 'meteor/aldeed:simple-schema';

AccountsRemoveForm = new SimpleSchema({
    password: {
        type: String,
        label: 'Your password',
        autoform: {
            type: 'password',
            autofocus: true
        }
    }
});