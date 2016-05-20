/**
 * Check if passed user or current user is admin
 *
 * @param userId
 * @returns {*|Boolean}
 */
isAdmin = function(userId) {
    userId = userId || Meteor.userId();
    return Roles.userIsInRole(userId, 'admin');
};
