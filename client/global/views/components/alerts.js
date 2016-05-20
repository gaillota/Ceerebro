Template.alerts.helpers({
    alerts: function() {
        return Alerts.find({}, {
            sort: {
                createdAt: -1
            }
        });
    }
});