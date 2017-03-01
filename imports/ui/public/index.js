import {Template} from "meteor/templating";
import {Counts} from 'meteor/tmeasday:publish-counts';

import '../components/logo.component';
import '../components/footer.component';

import './index.html';

const templateName = 'public.index';
Template[templateName].onCreated(function indexOnCreated() {
    this.subscribe('count.users');
});

Template[templateName].helpers({
    countUsers() {
        return Counts.get('count.users');
    },
    panelContent() {
        return [
            {
                icon: 'key',
                title: 'Secured',
                text: 'Using AES-256 encryption, Ceerebro provides you a secure solution to keep all of your credentials in one place. Only you can access them using your personal master key.'
            },
            {
                icon: 'globe',
                title: 'Everywhere',
                text: 'You can access your credentials from anywhere around the world. Even when you are not home, Ceerebro follows you anywhere.'
            },
            {
                icon: 'mobile',
                title: 'Mobile',
                text: 'With its responsive design and web app capable feature, you can attach Ceerebro to your mobile phone and make it even easier to access your passwords.'
            },
            {
                icon: 'universal-access',
                title: 'Accessibility',
                text: 'Easy-to-use, Ceerebro is a turnkey solution for all of your every day connection troubles. Just remember one password, and Ceerebro takes care of the rest.'
            }
        ]
    }
});
