import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';
import {$} from 'meteor/jquery';
import {Counts} from 'meteor/tmeasday:publish-counts';
import {ReactiveVar} from "meteor/reactive-var";
import {_} from "lodash";

import {Credentials} from '../../../api/credentials/credentials';
import {remove} from '../../../api/credentials/methods';
import {NotificationService} from '../../../startup/services';
import {showMasterPasswordModal, showCredentialModal} from '../../../startup/utilities';

import './index.html';
import './modals/show-credential.modal.js';

const templateName = 'rea.credentials.index';

Template[templateName].onCreated(function () {
    this.subscribe('credentials');

    this.search = new ReactiveVar();
});

Template[templateName].helpers({
    countCredentials() {
        return Counts.get('totalCredentials');
    },
    queryParam() {
        return Template.instance().search.get();
    },
    credentials() {
        const search = Template.instance().search.get();
        let query = {
            ownerId: Meteor.userId()
        };

        if (search) {
            query["$or"] = [
                {
                    domain: new RegExp(search)
                },
                {
                    identifier: new RegExp(search)
                }
            ];
        }

        return Credentials.find(query, {
            sort: {
                domain: 1
            }
        });
    },
    href() {
        return /http$/.test(this.domain) ? this.domain : `http://${this.domain}`;
    },
    editButtonState() {
        return !Session.get('masterKey') && 'is-disabled';
    }
});

Template[templateName].events({
    'click .js-credentials-see'(event) {
        event.preventDefault();

        const masterKey = Session.get('masterKey');
        if (!masterKey) {
            Session.set('passwordOnHold', this._id);
            showMasterPasswordModal();
            
            return;
        }

        showCredentialModal(this._id);
    },
    'click .js-credentials-remove'() {
        if (confirm('Are you sure ?')) {
            remove.call({credentialsId: this._id}, (error) => {
                if (error) {
                    NotificationService.error(error.toString());
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
