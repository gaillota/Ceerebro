Alerts = new Mongo.Collection(null);

AlertSchema = new SimpleSchema({
    type: {
        type: String,
        allowedValues: ['success', 'info', 'warning', 'danger'],
        autoValue: function() {
            if (this.isInsert && !this.isSet) {
                return "danger";
            }
        }
    },
    text: {
        type: String,
        autoValue: function() {
            if (this.isInsert && !this.isSet) {
                return "An error occured";
            }
        }
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if (this.isInsert && !this.isSet) {
                return new Date();
            }
        }
    }
});

Alerts.attachSchema(AlertSchema);