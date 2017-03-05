import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {$} from 'meteor/jquery';
import {Counts} from 'meteor/tmeasday:publish-counts';
import {ReactiveVar} from "meteor/reactive-var";
import {_} from "lodash";

import {remove} from '../../../api/credentials/methods';
import {NotificationService, SearchEngine} from '../../../startup/services';
import {
    getMasterKey,
    setCredentialsOnHold,
    showMasterPasswordModal,
    showCredentialModalFor
} from '../../../startup/utilities';

import './index.html';
import './modals/credentials.modal.js';

const templateName = 'rea.credentials.index';

Template[templateName].onCreated(function () {
    this.subscribe('credentials');
    this.subscribe('credentials.count');

    this.search = new ReactiveVar();
});

Template[templateName].helpers({
    countCredentials() {
        return Counts.get('credentials.count');
    },
    search() {
        return Template.instance().search.get();
    },
    credentials() {
        return SearchEngine.findCredentialsBy(Template.instance().search.get());
    },
    href() {
        return /http$/.test(this.domain) ? this.domain : `http://${this.domain}`;
    },
    editButtonState() {
        return !getMasterKey() && 'btn-disabled';
    }
});

Template[templateName].events({
    'click .js-credentials-see'(event) {
        event.preventDefault();

        const masterKey = getMasterKey();
        if (!masterKey) {
            setCredentialsOnHold(this._id);
            showMasterPasswordModal();
            
            return;
        }

        showCredentialModalFor(this._id);
    },
    'click .js-credentials-remove'() {
        if (confirm('Are you sure ?')) {
            remove.call({credentialsId: this._id}, (error) => {
                if (error) {
                    NotificationService.error(error.reason || error.toString());
                } else {
                    NotificationService.success('Credentials successfully removed !')
                }
            });
        }
    },
    'keyup .js-search-input'(event, template) {
        const keywords = event.target.value;

        template.search.set(keywords.trim().toLowerCase());
    },
    'click .js-reset'(event, template) {
        event.preventDefault();

        $('input.js-search-input').val('');
        template.search.set('');
    }
});
