import {Meteor} from 'meteor/meteor';
import {Counts} from 'meteor/tmeasday:publish-counts';
import {check} from 'meteor/check';

import {Readings} from '../readings';

Meteor.publish('readings', function readings() {
    if (!this.userId) {
        return this.ready();
    }

    Counts.publish(this, 'totalReadings', Readings.find({ownerId: this.userId}));

    return Readings.find({
        ownerId: this.userId
    });
});

Meteor.publish('readings.edit', function readingsEdit(readingsId) {
    check(readingsId, String);
    if (!this.userId) {
        return this.ready();
    }

    return Readings.find({
        _id: readingsId,
        ownerId: this.userId
    });
});
