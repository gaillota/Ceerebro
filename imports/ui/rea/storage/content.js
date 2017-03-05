import {Template} from "meteor/templating";

import {Files} from '../../../api/files/files';
import {FolderRepository} from '../../../startup/repositories';
import {remove} from '../../../api/folders/methods';
import {showModal} from '../../../startup/utilities';

import './content.html';

const templateName = 'rea.storage.content';

Template[templateName].hooks({
    created() {
        this.getFolderId = () => Template.currentData().folderId;
    }
});

Template[templateName].helpers({
    folders() {
        return FolderRepository.findFoldersIn({
            folderId: Template.instance().getFolderId(),
            ownerId: Meteor.userId(),
            projection: {
                sort: {
                    name: 1
                }
            }
        });
    },
    files() {
        const folderId = Template.instance().getFolderId();

        return Files.collection.find({
            "meta.folderId": folderId || {$exists: false}
        });
    }
});

Template[templateName].events({
    'click .js-folder-edit'(event) {
        event.preventDefault();

        showModal('folderModal', {folderId: this._id});
    },
    'click .js-folder-remove'(event) {
        event.preventDefault();

        if (confirm('Are you sure ?')) {
            remove.call({
                folderId: this._id
            });
        }
    }
});
