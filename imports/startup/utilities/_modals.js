import {Session} from 'meteor/session';

/**
 * Master password modal helpers
 */
export const showMasterPasswordModal = () => {
    Session.set('master-password.modal', true);
};

export const hideMasterPasswordModal = () => {
    Session.set('master-password.modal', undefined);
};

/**
 * Credential modal helpers
 */
export const showCredentialModal = (credentialId) => {
    Session.set('credential.modal', credentialId);
};

export const hideCredentialModal = () => {
    Session.set('credential.modal', undefined);
};