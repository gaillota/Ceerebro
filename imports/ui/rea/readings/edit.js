import {Template} from 'meteor/templating';
import {FlowRouter} from 'meteor/kadira:flow-router';

import {NotificationService} from '../../../startup/services';
import {Readings} from '../../../api/readings/readings';
import {ReadingsForm} from '../../../startup/common/forms/readings/readings.form';

import './edit.html';

const templateName = 'rea.readings.edit';
Template[templateName].helpers({
    readingsForm() {
        return ReadingsForm;
    },
    readings() {
        return Readings.findOne(FlowRouter.getParam('readingsId'));
    }
});

AutoForm.addHooks('rea.readings.edit.form', {
    onSuccess() {
        NotificationService.success('Reading edited');
        FlowRouter.go('rea.readings');
    }
});
