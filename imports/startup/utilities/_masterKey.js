import {Session} from 'meteor/session';

/**
 * Master key helpers
 */
export const setMasterKey = (masterKey) => {
    Session.set('masterKey', masterKey);
};

export const removeMasterKey = () => {
    Session.set('masterKey', undefined);
};
