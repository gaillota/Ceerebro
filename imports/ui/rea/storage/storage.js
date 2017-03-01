import {Template} from "meteor/templating";
import {FlowRouter} from 'meteor/kadira:flow-router';
import {AutoForm} from 'meteor/aldeed:autoform';

import {Folders} from '../../../api/folders/folders';
import {FolderForm} from '../../../startup/common/forms/storage/folder.form';
import {create} from '../../../api/folders/methods';

import './storage.html';

const templateName = 'rea.storage';
Template[templateName].onCreated(function () {
    this.getFolderId = () => FlowRouter.getParam('folderId');

    this.autorun(() => {
        this.subscribe('folders.in', this.getFolderId());
        this.subscribe('files.in', this.getFolderId());
    });
});

Template[templateName].helpers({
    folderForm() {
        return FolderForm;
    },
    folders() {
        const template = Template.instance();
        return Folders.find({
            parentId: template.getFolderId() || {$exists: false}
        });
    }
});

AutoForm.addHooks('rea.storage.folder', {
    onSubmit(doc) {
        this.event.preventDefault();

        const folderId = FlowRouter.getParam('folderId');
        if (folderId) {
            doc.folderId = folderId;
        }

        create.call(doc);
    }
});
