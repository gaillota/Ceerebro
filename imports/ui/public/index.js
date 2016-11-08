import {Template} from "meteor/templating";
import {Counts} from 'meteor/tmeasday:publish-counts';

import '../components/logo';
import '../components/footer';

import './index.html';

Template["public.index"].onCreated(function indexOnCreated() {
    this.subscribe('count.users');
});

Template["public.index"].helpers({
    countUsers() {
        return Counts.get('count.users');
    }
});