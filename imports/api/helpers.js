import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const idSchema = (fieldName, optional = false) => ({
    [fieldName]: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional
    }
});
