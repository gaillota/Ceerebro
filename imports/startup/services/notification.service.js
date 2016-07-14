import { sAlert } from "meteor/juliancwirko:s-alert";

export const Notification = (function() {
    let functions = {};

    _.each('success info warning error'.split(' '), (type) => {
        functions[type] = (message, options = {}) => {
            sAlert[type](message, options);
        }
    });

    return functions;
})();