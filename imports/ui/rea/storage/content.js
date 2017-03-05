import {Template} from "meteor/templating";

import {Folders} from '../../../api/folders/folders';
import {Files} from '../../../api/files/files';

import './content.html';

const templateName = 'rea.storage.content';

Template[templateName].helpers({
    folderName() {
        const folderId = Template.currentData().folderId;
        const folder = Folders.findOne(folderId);

        return (folder && folder.name) || 'Root';
    },
    folders() {
        const folderId = Template.currentData().folderId;

        console.log('folderId', folderId);
        console.log('parentId', folderId || {$exists: false});
        console.log('folders count', Folders.find().count());

        return Folders.find({
            parentId: folderId || {$exists: false}
        }, {
            sort: {
                name: 1
            }
        });
    },
    files() {
        const folderId = Template.currentData().folderId;

        return Files.collection.find({
            "meta.folderId": folderId || {$exists: false}
        });
    }
});
