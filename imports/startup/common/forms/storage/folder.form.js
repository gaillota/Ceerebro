import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const FolderForm = new SimpleSchema({
    name: {
        type: String,
        max: 255
    }
});
