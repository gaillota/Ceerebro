import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';
import {Counts} from 'meteor/tmeasday:publish-counts';
import {Modal} from 'meteor/peppelg:bootstrap-3-modal';
import {ReactiveVar} from "meteor/reactive-var";
import {_} from "lodash";

import {Notification} from '../../../startup/services/notification.service.js';

import './index.html';
import '../../components/master-password.modal';
import '../../components/show-credentials.modal';

import {Credentials} from '../../../api/credentials/credentials';
import {remove} from '../../../api/credentials/methods';

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
                    domain: new RegExp(search.toLowerCase())
                },
                {
                    identifier: new RegExp(search.toLowerCase())
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
        return Session.get('masterKey') ? '' : 'disabled';
    },
    searching() {
        return Template.instance().search.get();
    }
});

Template["rea.credentials.index"].events({
    'click .js-credentials-see'() {
        var masterKey = Session.get('masterKey');
        if (!masterKey) {
            Session.set('passwordOnHold', this._id);
            Modal.show('masterPasswordModal');
            return;
        }

        Modal.show('showCredentialsModal', this._id);
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

        template.search.set(keywords.trim());
    }
});