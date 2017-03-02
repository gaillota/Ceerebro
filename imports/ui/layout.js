import {Template} from "meteor/templating";

import './layout.html';

// Components used in template
import './components/footer.component';
import './components/icon.component';
import './components/navbar.component';
import './components/loading.component';

// Modals used in template
import './components/modals/master-password.modal';

Template.layout.helpers({
    modals() {
        return [
            'master-password.modal',
        ];
    }
});
