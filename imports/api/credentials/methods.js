import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Credentials } from '../credentials/credentials';
import { schema as CredentialsForm } from '../../startup/forms/credentials/CredentialsForm';

export const insert = new ValidatedMethod({
    name: 'credentials.insert',
    mixins: [ValidatedMethod.mixins.schema],
    schema: CredentialsForm,
    run({ credentials }) {
        Credentials.insert(credentials);
    }
});

export const update = new ValidatedMethod({
    name: 'credentials.update',
    mixins: [ValidatedMethod.mixins.isLoggedIn, ValidatedMethod.mixins.schema],
    schema: CredentialsForm,
    run({ credentialsId, doc }) {
        const credentials = Credentials.findOne(credentialsId);

        if (!credentials) {
            throw new Meteor.Error(404, 'Credentials not found');
        }

        if (!credentials.isOwner(Meteor.userId())) {
            throw new Meteor.Error(403, 'You can only edit your own credentials.');
        }

        Credentials.update({
            _id: credentialsId
        }, {
            $set: {
                domain: doc.domain,
                identifier: doc.identifier,
                password: doc.password
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

        Credentials.remove(credentialsId);
    }
});