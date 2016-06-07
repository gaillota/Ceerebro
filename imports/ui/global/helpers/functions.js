import { Session } from 'meteor/session';

export const removeMasterKey = () => {
    Session.set('masterKey', undefined);
};