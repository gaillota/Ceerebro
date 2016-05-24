throwAlert = function(text, type, time) {
    time = time || 3500;

    var alertId = Alerts.insert({
        type: type,
        text: text
    });

    Meteor.setTimeout(function() {
        Alerts.remove(alertId);
    }, time);
};