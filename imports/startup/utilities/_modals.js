import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';

/**
 * Master password modal helpers
 */
export const showMasterPasswordModal = () => Session.set('master-password.modal', true);

export const hideMasterPasswordModal = () => Session.set('master-password.modal', undefined);

export const isMasterPasswordModalVisible = () => Session.get('master-password.modal');

export const showPasswordError = () => {
    Session.set('master-password.error', true);
    Meteor.setTimeout(hidePasswordError, 5000);
};

export const hidePasswordError = () => Session.set('master-password.error', undefined);

export const hasPasswordError = () => Session.get('master-password.error');

/**
 * Credential modal helpers
 */
export const showCredentialModal = (credentialId) => Session.set('credential.modal', credentialId);

export const hideCredentialModal = () => Session.set('credential.modal', undefined);