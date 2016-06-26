import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const schema = new SimpleSchema({
    password: {
        type: String,
        label: "Your password",
        autoform: {
            type: "password",
            autofocus: true
        }
    }
});