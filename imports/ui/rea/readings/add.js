import {Template} from 'meteor/templating';
import {FlowRouter} from 'meteor/kadira:flow-router';

import {NotificationService} from '../../../startup/services';
import {schema as ReadingsForm} from '../../../startup/common/forms/readings/readings.form';

import './add.html';

const templateName = 'rea.readings.add';
Template[templateName].helpers({
    readingsForm() {
        return ReadingsForm;
    }
});

AutoForm.addHooks('rea.readings.add.form', {
    onSuccess() {
        NotificationService.success('Reading successfully added');
        FlowRouter.go('readings');
    }
});
