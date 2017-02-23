import {SimpleSchema} from 'meteor/aldeed:simple-schema';

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
        denyInsert: true
    }
};

export const countSchema = {
    type: Number,
    min: 0,
    defaultValue: 0
};
