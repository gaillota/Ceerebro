import {Template} from 'meteor/templating';
import {FlowRouter} from 'meteor/kadira:flow-router';

import {Notification} from '../../../startup/services/notification.service.js';
import {Readings} from '../../../api/readings/readings';
import {ReadingsForm} from '../../../startup/forms/readings/ReadingsForm';

import './edit.html';

Template["rea.readings.edit"].helpers({
    readingsForm() {
        return ReadingsForm;
    },
    readings() {
        return Readings.findOne(FlowRouter.getParam('readingsId'));
    }
});

AutoForm.addHooks('editReadings', {
    onSuccess() {
        Notification.success('Reading edited');
        FlowRouter.go('rea.readings');
    }
});