import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const FolderForm = new SimpleSchema({
    name: {
        type: String,
        label: 'Folder name',
        max: 255,
        autoform: {
            autofocus: true
        }
    }
});
