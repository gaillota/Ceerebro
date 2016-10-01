import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Notification } from '../../startup/services/notification.service.js';
import { schema as ReadingsForm } from '../../startup/forms/readings/ReadingsForm';
import { insert } from '../../api/readings/methods';

import './add.html';

Template.readingsAdd.helpers({
    readingsForm() {
        return ReadingsForm;
    }
});

AutoForm.addHooks('addReadings', {
    onSuccess() {
        Notification.success('Reading successfully added');
        FlowRouter.go('readings');
    }
});