import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

/**
 * Check if user has specified role
 *
 * @param role
 * @param userId
 * @returns {*|Boolean}
 */
export const hasRole = function(role, userId) {
    if (!role){
        return false;
    }
    userId = userId || Meteor.userId();

    return Roles.userIsInRole(userId, role);
};

/**
 * Check if user is admin
 *
 * @param userId
 * @returns {*|Boolean}
 */
export const isAdmin = function(userId) {
    userId = userId || Meteor.userId();
    return hasRole(userId, 'admin');
};