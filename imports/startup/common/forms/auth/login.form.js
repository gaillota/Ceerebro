import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const LoginForm = new SimpleSchema({
    email: {
        type: String,
        label: 'E-mail address / Username',
        autoform: {
            type: 'email',
            autofocus: ''
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