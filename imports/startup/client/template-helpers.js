import {Template} from 'meteor/templating';
import {moment} from 'meteor/momentjs:moment';
import {_} from 'lodash';

import {hasRole, formatDate, formatDateRelative} from '../utilities';

const helpers = {
    hasRole,
    formatDate,
    formatDateRelative,
    _(...args) {
        if (!args.length) {
            return;
        }

        const name = args[0];
        args.shift();

        return _[name].apply(_, args);
    },
    fa(icon) {
        return `<i class="fa fa-${icon}"></i>`;
    },
    assets(path) {
        return Meteor.absoluteUrl(path);
    },
    toJson(json) {
        if (!_.isObject(json)) {
            return "Not an object";
        }

        return JSON.stringify(json);
    },
    pluralize(count = 0, singular = '') {
        return count > 1 ? singular + 's' : singular;
    },
    userStatus(user = this) {
        const icons = {
            DISABLED: {
                type: 'danger',
                icon: 'user-times',
                text: 'Banned'
            },
            VERIFIED: {
                type: 'success',
                icon: 'check',
                text: 'Active'
            },
            WAITING: {
                type: 'warning',
                icon: 'clock-o',
                text: 'Waiting...'
            }
        };

        return user.disabled ? icons.DISABLED : user.emails[0].verified ? icons.VERIFIED : icons.WAITING;
    },
    connectionStatusColor() {
        if (!this.status) {
            return 'gray';
        }

        if (this.status.online) {
            return '#5cb85c';
        } else if (this.status.idle) {
            return '#f0ad4e';
        } else {
            return 'gray';
        }
    },
    // lodash isEmpty function does not work on cursors
    isEmpty(data) {
        if (!data) {
            return true;
        }

        if (_.isArray(data) || _.isString(data)) {
            return !data.length;
        }

        return !data.count();
    },
    genderIconName(gender) {
        return gender == 'female' ? 'venus' : 'mars';
    },
    masterKeyIsSet() {
        return Session.get('masterKey');
    },
};

_.forEach(helpers, (func, name) => {
    Template.registerHelper(name, func);
});
