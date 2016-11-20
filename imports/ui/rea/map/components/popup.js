import {Template} from "meteor/templating";

import {formatDateRelative} from '../../../../startup/utilities/functions';

import './popup.html';

Template["rea.map.popup"].helpers({
    updatedAt() {
        return formatDateRelative(this.last_update);
    }
});