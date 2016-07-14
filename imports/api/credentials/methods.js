import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Credentials } from '../credentials/credentials';
import { schema as CredentialsForm } from '../../startup/forms/credentials/CredentialsForm';

export const insert = new ValidatedMethod({
    name: 'credentials.insert',
    mixins: [ValidatedMethod.mixins.isLoggedIn, ValidatedMethod.mixins.schema],
    schema: [CredentialsForm, {
        iv: {
            type: String
        }
    }],
    run(credentials) {
        credentials.owner = Meteor.userId();
        return Credentials.insert(credentials);
    }
});

export const update = new ValidatedMethod({
    name: 'credentials.update',
    mixins: [ValidatedMethod.mixins.isLoggedIn, ValidatedMethod.mixins.schema],
    schema: [CredentialsForm, {
        credentialsId: {
            type: String,
            regEx: SimpleSchema.RegEx.Id
        }
    }],
    run({ credentialsId, domain, identifier, password }) {
        const credentials = Credentials.findOne(credentialsId);

        if (!credentials) {
            throw new Meteor.Error(404, 'Credentials not found');
        }

        if (!credentials.isOwner(Meteor.userId())) {
            throw new Meteor.Error(403, 'You can only edit your own credentials.');
        }

        return Credentials.update({
            _id: credentialsId
        }, {
            $set: {
                domain: domain,
                identifier: identifier,
                password: password
            }
        });
    }
});

export const remove = new ValidatedMethod({
    name: 'credentials.remove',
    mixins: [ValidatedMethod.mixins.isLoggedIn, ValidatedMethod.mixins.schema],
    schema: {
        credentialsId: {
            type: String
        }
    },
    run({ credentialsId }) {
        const credentials = Credentials.findOne(credentialsId);

        if (!credentials) {
            throw new Meteor.Error(404, 'Credentials not found');
        }

        if (!credentials.isOwner(Meteor.userId())) {
            throw new Meteor.Error(403, 'You can only remove your own credentials.');
        }

        return Credentials.remove(credentialsId);
    }
});