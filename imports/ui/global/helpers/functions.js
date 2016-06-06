import { Session } from 'meteor/session';

removeMasterKey = function() {
    Session.set('masterKey', undefined);
};