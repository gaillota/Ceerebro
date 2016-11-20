import {Session} from 'meteor/session';
import {moment} from 'meteor/momentjs:moment';

export const formatDate = (date) => {
    if (!date) {
        return '-1';
    }

    date = moment(date);
    return date.isSame(new Date(), 'day') ? date.format('HH:mm') : date.isSame(new Date(), 'year') ? date.format('MMMM Do') : date.format('MMMM Do YYYY');
};

export const formatDateRelative = (date) => {
    if (!date) {
        return '-1';
    }

    return moment(date).fromNow();
};

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