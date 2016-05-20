Credentials = new Mongo.Collection("credentials");

Credentials.schema = new SimpleSchema({
    domain: {
        type: String
    },
    identifier: {
        type: String
    },
    password: {
        type: String
    },
    owner: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
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

Credentials.attachSchema(Credentials.schema);

// Deny all client-side access (management through methods)
Credentials.deny({
    'insert': function() {
        return true;
    },
    'update': function() {
        return true;
    },
    'remove': function() {
        return true;
    }
});

Credentials.helpers({
    isOwner: function(userId) {
        return this.owner = userId;
    }
});