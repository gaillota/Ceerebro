import {Template} from "meteor/templating";
import {FlowRouter} from 'meteor/kadira:flow-router';
import {AutoForm} from 'meteor/aldeed:autoform';

import {Folders} from '../../../api/folders/folders';
import {showModal} from '../../../startup/utilities';

import './content';
import './modals/folder.modal';

import './storage.html';

const templateName = 'rea.storage';

Template[templateName].onCreated(function () {
    this.getFolderId = () => FlowRouter.getParam('folderId');
    this.getFolder = () => Folders.findOne(this.getFolderId());

    this.autorun(() => {
        this.subscribe('folder', this.getFolderId());
        this.subscribe('folders.in', this.getFolderId());
        this.subscribe('files.in', this.getFolderId());
    });
});

Template[templateName].helpers({
    folder() {
        const template = Template.instance();
        const folder = template.getFolder();

        return {
            folderName: folder && folder.name || 'Storage',
            folderIcon: (folder && 'folder') || 'dropbox'
        }
    },
    folderIdArray() {
        const template = Template.instance();
        const folderId = template.getFolderId();

        return folderId ? [folderId] : [0];
    },
    folderData(folderId) {
        const template = Template.instance();

        return {
            foldersReady: template.subscriptionsReady(),
            folderId
        }
    }
});

Template[templateName].events({
    'click .js-new-folder'(event) {
        event.preventDefault();

        showModal('folderModal');
    }
});
