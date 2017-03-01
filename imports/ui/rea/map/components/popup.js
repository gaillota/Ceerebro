import {Template} from "meteor/templating";

import {formatDateRelative} from '../../../../startup/utilities';

import './popup.html';

const templateName = 'rea.map.popup';
Template[templateName].helpers({
    updatedAt() {
        return formatDateRelative(this.last_update);
    }
});
