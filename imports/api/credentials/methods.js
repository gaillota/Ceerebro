import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';

import {Credentials} from './credentials';
import {CredentialsForm} from '../../startup/common/forms/credentials/credentials.form';
import {idSchema} from '../helpers';

const mixins = ValidatedMethod.mixins;
const CREDENTIALS_ID = idSchema("credentialsId", true);

export const upsert = new ValidatedMethod({
    name: 'credentials.upsert',
    mixins: [mixins.isLoggedIn, mixins.schema],
    schema: [CREDENTIALS_ID, CredentialsForm, {iv: {type: String}}],
    run({credentialsId, domain, identifier, password, iv}) {
        // Separated insert and update (instead of a single upsert) because of schema cleaning
        if (credentialsId) {
            if (!Credentials.findOne(credentialsId).isOwner(this.userId)) {
                throw new Meteor.Error("not-authorized", "You can only update your own credentials");
            }

            return Credentials.update(credentialsId, {
                $set: {
                    domain,
                    identifier,
                    password,
                    iv
                }
            });
        }

        return Credentials.insert({
            domain,
            identifier,
            password,
            iv
        });
    }
});

export const insert = new ValidatedMethod({
    name: 'credentials.insert',
    mixins: [mixins.isLoggedIn, mixins.schema],
    schema: [CredentialsForm],
    run(credentials) {
        credentials.ownerId = this.userId;
        return Credentials.insert(credentials);
    }
});

export const update = new ValidatedMethod({
    name: 'credentials.update',
    mixins: [mixins.isLoggedIn, mixins.schema, mixins.restrict, mixins.provide],
    schema: [CredentialsForm, {
        credentialsId: {
            type: String,
            regEx: SimpleSchema.RegEx.Id
        }
    }],
    provide: function ({credentialsId}) {
        return Credentials.findOne(credentialsId);
    },
    restrictions: [
        {
            condition: function (args, credentials) {
                return credentials.ownerId !== this.userId;
            },
            error: function () {
                return new Meteor.Error("not-authorized", "You can only update your own credentials");
            }
        }
    ],
    run({credentialsId, domain, identifier, password}) {
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
    mixins: [mixins.isLoggedIn, mixins.schema],
    schema: {
        credentialsId: {
            type: String
        }
    },
    run({credentialsId}) {
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
