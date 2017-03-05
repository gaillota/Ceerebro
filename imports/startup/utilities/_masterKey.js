import {Session} from 'meteor/session';

/**
 * Master key helpers
 */
export const setMasterKey = (masterKey) => Session.setPersistent('masterKey', masterKey);
export const getMasterKey = () => Session.get('masterKey');

export const setCredentialsOnHold = (credentialsId) => Session.set('credentialsOnHold', credentialsId);
export const getCredentialsOnHold = () => {
    return Session.get('credentialsOnHold');
};
