import { SimpleSchema } from 'meteor/aldeed:simple-schema';

RegistrationForm = new SimpleSchema({
    username: {
        type: String,
        label: "Username",
        min: 3,
        max: 20,
        autoform: {
            autofocus: true
        }
    },
    email: {
        type: String,
        label: "E-mail address",
        regEx: SimpleSchema.RegEx.Email,
        autoform: {
            type: "email"
        }
    },
    password: {
        type: String,
        label: "Password",
        min: 5,
        autoform: {
            type: "password"
        }
    },
    confirm: {
        type: String,
        label: "Confirm password",
        autoform: {
            type: "password"
        },
        custom: function() {
            if (this.value !== this.field('password').value) {
                return 'passwordMismatch';
            }
        }
    }
});