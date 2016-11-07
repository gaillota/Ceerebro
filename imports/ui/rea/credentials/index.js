import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';
import {$} from 'meteor/jquery';
import {Counts} from 'meteor/tmeasday:publish-counts';
import {ReactiveVar} from "meteor/reactive-var";
import {_} from "lodash";

import {Notification} from '../../../startup/services/notification.service.js';

import './index.html';
import '../../components/modals/show-credential.modal.js';

import {Credentials} from '../../../api/credentials/credentials';
import {remove} from '../../../api/credentials/methods';
import {showMasterPasswordModal, showCredentialModal} from '../../../startup/utilities/functions';

Template["rea.credentials.index"].onCreated(function credentialsCreated() {
    this.subscribe('credentials');
    this.search = new ReactiveVar();
});

Template["rea.credentials.index"].helpers({
    countCredentials() {
        return Counts.get('totalCredentials');
    },
    credentials() {
        const search = Template.instance().search.get();
        let query = {
            owner: Meteor.userId()
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
    editButtonState() {
        return !Session.get('masterKey') && 'is-disabled';
    },
    searching() {
        return Template.instance().search.get();
    }
});

Template["rea.credentials.index"].events({
    'click .js-credentials-see'() {
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
                    Notification.error(error.toString());
                } else {
                    Notification.success('Credentials successfully removed !')
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

        template.search.set(false);
    }
});