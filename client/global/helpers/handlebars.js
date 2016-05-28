Template.registerHelper('fa', function(icon) {
    return '<i class="fa fa-' + icon + '"></i>';
});

Template.registerHelper('formatDate', function(date, defaultValue) {
    if (!date) {
        return defaultValue || 'undefined';
    }

    date = moment(date);
    return date.isSame(new Date(), 'day') ? date.format('HH:mm') : date.isSame(new Date(), 'year') ? date.format('MMMM Do') : date.format('MMMM Do YYYY')
});

Template.registerHelper('formatDateRelative', function(date, defaultValue) {
    if (!date) {
        return defaultValue || 'undefined';
    }

    return moment(date).fromNow();
});

Template.registerHelper('userStatus', function(user) {
    user = user || this;
    if (user.disabled) {
        return {
            type: 'danger',
            icon: 'user-times',
            text: 'Banned'
        }
    } else if (user.emails[0].verified) {
        return {
            type: 'success',
            icon: 'check-square-o',
            text: 'Active'
        }
    } else {
        return {
            type: 'warning',
            icon: 'clock-o',
            text: 'Waiting...'
        }
    }
});

Template.registerHelper('masterKeyIsSet', function() {
    return Session.get('masterKey');
});

Template.registerHelper('isEmpty', function(data) {
    if (!data) {
        return true;
    }
    
    if (_.isArray(data) || _.isString(data)) {
        return !data.length;
    }

    return !data.count();
});
