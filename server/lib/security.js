/**
 * Check if user is logged in
 */
checkUser = function() {
    if (!Meteor.userId()) {
        throw new Meteor.Error(403, 'You must be logged in to access this section.');
    }
};

/**
 * Check if user is logged in and is admin
 */
hasRole = function(role) {
    checkUser();
    check(role, String);

    if (!Roles.userIsInRole(Meteor.userId(), role)) {
        throw new Meteor.Error(403, 'You must be admin to access this section.');
    }
};