import {sAlert} from "meteor/juliancwirko:s-alert";

export const NotificationService = (function () {
    let functions = {};
    const types = [
        'success',
        'info',
        'warning',
        'error'
    ];

    types.forEach((type) => {
        functions[type] = (message, options = {}) => {
            options.timeout = computeTimeout(message);
            sAlert[type](message, options);
        }
    });

    const computeTimeout = (text) => {
        const awpm = 200;
        const minTime = 3000;

        const words = text.trim().split(' ').length;
        const time = (words / awpm) * 60 * 1000;

        return Math.max(time, minTime);
    };

    return functions;
})();
