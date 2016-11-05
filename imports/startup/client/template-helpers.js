import {Template} from 'meteor/templating';
import {moment} from 'meteor/momentjs:moment';
import {_} from 'lodash';

const helpers = {
    fa(icon) {
        return `<i class="fa fa-${icon}"></i>`;
    },
    formatDate(date) {
        if (!date) {
            return '-1';
        }

        date = moment(date);
        return date.isSame(new Date(), 'day') ? date.format('HH:mm') : date.isSame(new Date(), 'year') ? date.format('MMMM Do') : date.format('MMMM Do YYYY');
    },
    formatDateRelative(date) {
        if (!date) {
            return '-1';
        }

        return moment(date).fromNow();
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
                icon: 'check-square-o',
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
