import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {moment} from 'meteor/momentjs:moment';

import {Readings} from './readings';
import {ReadingsForm} from '../../startup/forms/readings/ReadingsForm';

export const insert = new ValidatedMethod({
    name: 'readings.insert',
    mixins: [ValidatedMethod.mixins.isLoggedIn, ValidatedMethod.mixins.schema],
    schema: [ReadingsForm],
    run(readings) {
        // Check if reading with same selected date already exists
        if (Readings.find({createdAt: readings.createdAt}).count()) {
            throw new Meteor.Error(403, 'You can only add one reading with the same selected date');
        }

        const previous = Readings.findOne({
            createdAt: {
                $lt: readings.createdAt || new Date()
            }
        }, {
            sort: {
                createdAt: -1
            }
        });
        const next = Readings.findOne({
            createdAt: {
                $gt: readings.createdAt || new Date()
            }
        }, {
            sort: {
                createdAt: -1
            }
        });

        if (previous && readings.value <= previous.value) {
            throw new Meteor.Error(403, 'Value must be above previous reading');
        }
        if (next && readings.value >= next.value) {
            throw new Meteor.Error(403, 'Value must be under next reading');
        }

        readings.owner = Meteor.userId();
        return Readings.insert(readings);
    }
});

export const update = new ValidatedMethod({
    name: 'readings.update',
    mixins: [ValidatedMethod.mixins.isLoggedIn, ValidatedMethod.mixins.schema],
    schema: [ReadingsForm],
    run({readingsId, value}) {
        const readings = Readings.findOne(readingsId);

        if (!readings) {
            throw new Meteor.Error(404, 'Readings not found');
        }

        if (!readings.isOwner(Meteor.userId())) {
            throw new Meteor.Error(403, 'You can only edit your own credentials.');
        }

        return Readings.update({
            _id: readingsId
        }, {
            $set: {
                value: value
            }
        });
    }
});

export const remove = new ValidatedMethod({
    name: 'readings.remove',
    mixins: [ValidatedMethod.mixins.isLoggedIn, ValidatedMethod.mixins.schema],
    schema: {
        readingsId: {
            type: String
        }
    },
    run({readingsId}) {
        const readings = Readings.findOne(readingsId);

        if (!readings) {
            throw new Meteor.Error(404, 'Readings not found');
        }

        if (!readings.isOwner(Meteor.userId())) {
            throw new Meteor.Error(403, 'You can only remove your own readings.');
        }

        return Readings.remove(readingsId);
    }
});