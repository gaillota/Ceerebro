import { Template } from 'meteor/templating';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';

import { removeMasterKey } from '../../startup/utilities/functions';
import './masterPasswordModal';

import './masterKeyButton.html';


Template.masterKeyButton.events({
    'click .js-set-key'(event) {
        event.preventDefault();
        Modal.show('masterPasswordModal');
    },
    'click .js-remove-key'(event) {
        event.preventDefault();
        removeMasterKey();
    }
});