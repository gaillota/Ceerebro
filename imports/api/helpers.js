import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const idSchema = (fieldName = null, optional = false) => {
    let obj = {};
    obj[fieldName] = {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional
    };

    return obj;
};