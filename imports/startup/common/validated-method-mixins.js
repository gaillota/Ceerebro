import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';
import { simpleSchemaMixin } from 'meteor/rlivingston:simple-schema-mixin';

ValidatedMethod.mixins = {};

ValidatedMethod.mixins.isLoggedIn = function (methodOptions) {
    methodOptions.checkLoggedInError = {
        error: 'notLogged',
        message: 'You need to be logged in to call this method',//Optional
        reason: 'You need to login' //Optional
    };

    return LoggedInMixin(methodOptions);
};

ValidatedMethod.mixins.isAdmin = function (methodOptions) {
    methodOptions.checkRoles = {
        roles: ['admin'],
        rolesError: {
            error: 'not-allowed',
            message: 'You are not allowed to call this method',//Optional
            reason: 'You are not allowed to call this method' //Optional
        }
    };

    return ValidatedMethod.mixins.isLoggedIn(methodOptions);
};

ValidatedMethod.mixins.schema = function (methodOptions) {
    return simpleSchemaMixin(methodOptions);
};