import {Roles} from 'meteor/alanning:roles';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const hasRole = (role, userId) => Roles.userIsInRole(userId, role);
export const capitalize = (text = '') => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
export const checkId = (id) => {
    return new SimpleSchema({
        id: {
            type: String,
            regEx: SimpleSchema.RegEx.Id
        }
    }).validate({id});
}
