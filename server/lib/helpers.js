/**
 * Check if user has specified role
 *
 * @param role
 * @param userId
 * @returns {*|Boolean}
 */
hasRole = function(role, userId) {
    if (!role){
        return false;
    }
    userId = userId || this.userId || Meteor.userId();

    return Roles.userIsInRole(userId, role);
};

/**
 * Check if user is admin
 *
 * @param userId
 * @returns {*|Boolean}
 */
isAdmin = function(userId) {
    userId = userId || this.userId || Meteor.userId();
    return hasRole(userId, 'admin');
};