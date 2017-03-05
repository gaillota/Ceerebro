import {Template} from "meteor/templating";
import {FlowRouter} from 'meteor/kadira:flow-router';
import {AutoForm} from 'meteor/aldeed:autoform';

import {Folders} from '../../../../api/folders/folders';
import {FolderForm} from '../../../../startup/common/forms/storage/folder.form';
import {upsert} from '../../../../api/folders/methods';
import {hideModal} from '../../../../startup/utilities';

import './folder.modal.html';

const templateName = 'folderModal';

Template[templateName].helpers({
    folderForm() {
        return FolderForm;
    },
    folder() {
        return Template.currentData() && Folders.findOne(Template.currentData().folderId);
    }
});

AutoForm.addHooks('folder.modal.form', {
    onSubmit(doc) {
        this.event.preventDefault();
        const template = this.template.parent();

        doc.folderId = template.data && template.data.folderId;
        doc.parentId = FlowRouter.getParam('folderId');

        upsert.call(doc, this.done);
    },
    onSuccess() {
        hideModal('folderModal');
    }
});
