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