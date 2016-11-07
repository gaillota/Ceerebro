import {Session} from 'meteor/session';

/**
 * Master key
 */
export const setMasterKey = (masterKey) => {
    Session.set('masterKey', masterKey);
};

export const removeMasterKey = () => {
    Session.set('masterKey', undefined);
};

/**
 * Master password modal
 */
export const showMasterPasswordModal = () => {
    Session.set('master-password.modal', true);
};

export const hideMasterPasswordModal = () => {
    Session.set('master-password.modal', undefined);
};

/**
 * Credential modal
 */
export const showCredentialModal = (credentialId) => {
    Session.set('credential.modal', credentialId);
};

export const hideCredentialModal = () => {
    Session.set('credential.modal', undefined);
};