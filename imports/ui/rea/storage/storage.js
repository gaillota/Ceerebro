import {Template} from "meteor/templating";
import {FlowRouter} from 'meteor/kadira:flow-router';
import {AutoForm} from 'meteor/aldeed:autoform';

import {Folders} from '../../../api/folders/folders';
// import {create} from '../../../api/folders/methods';

import './content';
import './storage.html';

const templateName = 'rea.storage';

Template[templateName].onCreated(function () {
    this.getFolderId = () => FlowRouter.getParam('folderId');

    this.autorun(() => {
        this.subscribe('folder', this.getFolderId());
        this.subscribe('folders.in', this.getFolderId());
        this.subscribe('files.in', this.getFolderId());
    });
});

Template[templateName].helpers({
    folderIdArray() {
        const template = Template.instance();
        const folderId = template.getFolderId();

        return Folders.findOne(folderId) ? [folderId] : [0];
    },
    folderData(folderId) {
        const template = Template.instance();

        return {
            foldersReady: template.subscriptionsReady(),
            folderId
        }
    }
});
//
// AutoForm.addHooks('rea.storage.folder', {
//     onSubmit(doc) {
//         this.event.preventDefault();
//
//         const folderId = FlowRouter.getParam('folderId');
//         if (folderId) {
//             doc.folderId = folderId;
//         }
//
//         create.call(doc, this.done);
//     }
// });
