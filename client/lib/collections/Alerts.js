// Local collection used for better UX
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
    acrossRoute: {
        type: Boolean,
        autoValue: function() {
            if (this.isInsert && !this.isSet) {
                return false;
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