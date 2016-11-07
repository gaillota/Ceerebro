import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {HTTP} from 'meteor/http';

export const Credentials = new Mongo.Collection("credentials");

// Deny all client-side access (management through methods)
Credentials.deny({
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return true;
    }
});

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
    iv: {
        type: String
    },
    owner: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    createdAt: {
        type: Date,
        autoValue: function () {
            if (this.isInsert && !this.isSet) {
                return new Date();
            }
        }
    }
});

Credentials.attachSchema(Credentials.schema);

Credentials.helpers({
    isOwner(userId) {
        return this.owner = userId;
    },
    favicon() {
        let url = this.domain;
        if (!/http/i.test(url)) {
            url = 'http://' + url;
        }
        url = url + '/favicon.ico';

        HTTP.get(url, (error, result) => {
            // Handle error
        });

        return {
            link: url,
            name: this.domain
        };
    }
});