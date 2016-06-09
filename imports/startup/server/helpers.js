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

/**
 * Check if user is logged in
 */
export const checkUser = function() {
    if (!Meteor.userId()) {
        throw new Meteor.Error(403, 'You must be logged in to access this section.');
    }
};

/**
 * Check if user is logged in and is admin
 */
export const checkAdmin = function() {
    checkUser();

    if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
        throw new Meteor.Error(403, 'You must be admin to access this section.');
    }
};