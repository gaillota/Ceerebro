import {Template} from "meteor/templating";

import {formatDateRelative} from '../../../../startup/utilities';

import './popup.html';

Template["rea.map.popup"].helpers({
    updatedAt() {
        return formatDateRelative(this.last_update);
    }
});