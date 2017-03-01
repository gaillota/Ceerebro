import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';

/**
 * Master password modal helpers
 */
const masterPasswordModalName = 'master-password.modal';
export const showMasterPasswordModal = () => toggleModal(masterPasswordModalName);
export const hideMasterPasswordModal = () => toggleModal(masterPasswordModalName);
export const isMasterPasswordModalVisible = () => getModalData(masterPasswordModalName);

export const showPasswordError = () => {
    Session.set('master-password.error', true);
    Meteor.setTimeout(hidePasswordError, 5000);
};

export const hidePasswordError = () => Session.set('master-password.error', undefined);

export const hasPasswordError = () => Session.get('master-password.error');

/**
 * Credential modal helpers
 */
export const showCredentialModal = (credentialId) => toggleModal('credential.modal', credentialId);
export const hideCredentialModal = () => toggleModal('credential.modal');

/**
 * Modal helpers
 */
export const toggleModal = (modal, data) => Session.set(`${modal}.active`, data || !getModalData(modal));
export const getModalData = modal => Session.get(`${modal}.active`);
