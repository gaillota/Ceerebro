import {Meteor} from 'meteor/meteor';
import {Template} from "meteor/templating";

import './layout.html';

// Components used in template
import './components/navbar.component';
import './components/loading.component';
import './components/icon.component';
import './components/footer.component';

// Modals used in template
import './components/modals/master-password.modal';
import './rea/credentials/modals/show-credential.modal';

Template.layout.helpers({
    modals() {
        return !Meteor.userId() ? [] : [
                'master-password.modal',
                'show-credentials.modal'
            ];
    }
});
