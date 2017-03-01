import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {_} from 'lodash';

// Helper for denying client code
export const denyAll = {
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return true;
    }
};

// Field common to all collections
export const defaultSchema = (fields = '') => {
    if (!_.isString(fields)) {
        // Don't stop execution by throwing an error
        return {};
    }

    const defaultSchemas = {
        ownerId: {
            type: String,
            regEx: SimpleSchema.RegEx.Id,
            autoValue: function () {
                if (this.isInsert && !this.isSet) {
                    return Meteor.userId();
                }
            },
            denyUpdate: true
        },
        createdAt: {
            type: Date,
            autoValue: function () {
                if (this.isInsert && !this.isSet) {
                    return new Date();
                }
            },
            denyUpdate: true
        },
        updatedAt: {
            type: Date,
            autoValue: function () {
                if (this.isUpdate) {
                    return new Date();
                }
            },
            optional: true,
            denyInsert: true
        }
    };

    return !fields ? defaultSchemas : _.pick(defaultSchemas, fields.split(' '));
};

// Default schema for "count" fields
export const countSchema = {
    type: Number,
    min: 0,
    defaultValue: 0
};
