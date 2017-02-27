import {SimpleSchema} from 'meteor/aldeed:simple-schema';

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
export const defaultSchema = {
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

// Default schema for "count" fields
export const countSchema = {
    type: Number,
    min: 0,
    defaultValue: 0
};
