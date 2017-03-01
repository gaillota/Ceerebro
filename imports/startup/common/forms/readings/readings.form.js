import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const ReadingsForm = new SimpleSchema({
    value: {
        type: Number,
        min: 0
    },
    createdAt: {
        type: Date,
        optional: true,
        autoform: {
            type: 'date'
        }
    }
});