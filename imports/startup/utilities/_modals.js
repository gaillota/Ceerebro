import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {Modal} from 'meteor/peppelg:bootstrap-3-modal';

/**
 * Master password modal helpers
 */
const masterPasswordModalName = 'masterPasswordModal';
export const showMasterPasswordModal = () => Modal.show(masterPasswordModalName);
export const hideMasterPasswordModal = () => Modal.hide(masterPasswordModalName);

/**
 * Credential modal helpers
 */
const credentialsModalName = 'credentialsModal';
export const showCredentialModalFor = (credentialId) => Modal.show(credentialsModalName, credentialId);
export const hideCredentialModal = () => Modal.hide(credentialsModalName);

/**
 * Modal helpers
 */
// export const toggleModal = (modal, data) => Session.set(`${modal}.active`, data || !getModalData(modal));
// export const getModalData = modal => Session.get(`${modal}.active`);
