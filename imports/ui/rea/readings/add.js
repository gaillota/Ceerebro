import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Notification } from '../../../startup/services/notification.service.js';
import { schema as ReadingsForm } from '../../../startup/forms/readings/ReadingsForm';

import './add.html';

Template["rea.readings.add"].helpers({
    readingsForm() {
        return ReadingsForm;
    }
});

AutoForm.addHooks('rea.readings.add', {
    onSuccess() {
        Notification.success('Reading successfully added');
        FlowRouter.go('readings');
    }
});