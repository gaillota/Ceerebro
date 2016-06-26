import { Notifications } from 'meteor/gfk:notifications';

export const NotificationService = (function() {
    let functions = {};

    _.each('error warn info success'.split(' '), (type) => {
        functions[type] = (message, title = '', options = {}) => {
            options.type = type;
            Notifications[type](title, message, options);
        }
    });

    return functions;
})();