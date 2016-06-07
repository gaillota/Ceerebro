import { Template } from 'meteor/templating';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';

import './masterKeyButton.html';

import { removeMasterKey } from '../../helpers/functions.js';

Template.masterKeyButton.events({
    'click .js-set-key': function(event) {
        event.preventDefault();
        Modal.show('masterPasswordModal');
    },
    'click .js-remove-key': function(event) {
        event.preventDefault();
        removeMasterKey();
    }
});