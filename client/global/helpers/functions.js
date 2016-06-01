notify = function(text, type, acrossRoute) {
    type = type || 'danger';
    acrossRoute = acrossRoute || false;
    check(text, String);
    check(type, Match.Where(function(type) {
        check (type, String);
        return _.indexOf('success info warning danger'.split(' '), type) >= 0;
    }));

    var alertId = Alerts.insert({
        type: type,
        text: text,
        acrossRoute: acrossRoute
    });

    Meteor.setTimeout(function() {
        Alerts.remove(alertId);
    }, 3500);
};

removeMasterKey = function() {
    Session.set('masterKey', undefined);
};