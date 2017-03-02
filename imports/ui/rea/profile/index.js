import {Template} from "meteor/templating";
import {FlowRouter} from 'meteor/kadira:flow-router';

import {harakiri} from "../../../api/users/methods";
import {NotificationService} from "../../../startup/services";

import './index.html';

const templateName = 'rea.profile';

Template[templateName].events({
    'click .js-harakiri'(event) {
        event.preventDefault();

        // Ugly as fuck, but what the hell...
        if (confirm('Are you sure you want to delete your account ?')) {
            const password = prompt("Please enter your password to confirm.");

            if (password) {
                harakiri.call({
                    digest: Package.sha.SHA256(password)
                }, (error) => {
                    if (error) {
                        NotificationService.error(error.toString());
                        return;
                    }

                    FlowRouter.go('public.index');
                });
            }
        }
    }
});
