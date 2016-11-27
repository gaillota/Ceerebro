import {Template} from 'meteor/templating';
import {moment} from 'meteor/momentjs:moment';
import {_} from 'lodash';

import {formatDate, formatDateRelative} from '../utilities';

const helpers = {
    fa(icon) {
        return `<i class="fa fa-${icon}"></i>`;
    },
    formatDate(date) {
        return formatDate(date);
    },
    formatDateRelative(date) {
        return formatDateRelative(date);
    },
    assets(path) {
        return Meteor.absoluteUrl(path);
    },
    pluralize(count = 0, singular = '') {
        return count > 1 ? singular + 's' : singular;
    },
    userStatus(user = this) {
        const icons = {
            disabled: {
                type: 'danger',
                icon: 'user-times',
                text: 'Banned'
            },
            verified: {
                type: 'success',
                icon: 'check',
                text: 'Active'
            },
            waiting: {
                type: 'warning',
                icon: 'clock-o',
                text: 'Waiting...'
            }
        };

        return user.disabled ? icons.disabled : user.emails[0].verified ? icons.verified : icons.waiting;
    },
    masterKeyIsSet() {
        return Session.get('masterKey');
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
    }
};

_.forEach(helpers, (func, name) => {
    Template.registerHelper(name, func);
});
