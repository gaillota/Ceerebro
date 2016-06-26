import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const schema = new SimpleSchema({
    email: {
        type: String,
        label: 'E-mail address / Username',
        autoform: {
            type: 'email',
            autofocus: true
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