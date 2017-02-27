import {Session} from 'meteor/session';

/**
 * Master key helpers
 */
export const setMasterKey = (masterKey) => Session.setPersistent('masterKey', masterKey);

export const getMasterKey = () => Session.get('masterKey');

export const removeMasterKey = () => Session.setPersistent('masterKey', undefined);
