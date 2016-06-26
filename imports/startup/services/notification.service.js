import { Notifications } from 'meteor/gfk:notifications';

export const NotificationService = (function() {
    let functions = {};

    _.each('error warn info success'.split(' '), (type) => {
        console.log(type);
        functions[type] = (message, title = '', options = {}) => {
            options.type = type;
            console.log(options);
            console.log('notification !');
            Notifications[type](title, message, options);
        }
    });

    return functions;
})();