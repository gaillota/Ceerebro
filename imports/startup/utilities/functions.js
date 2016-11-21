import {Session} from 'meteor/session';
import {moment} from 'meteor/momentjs:moment';

/**
 * Date helpers
 */
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
 * Dispatcher helpers
 */
export const setDispatcherPath = (path) => {
    Session.set('dispatcher.path', path);
};

export const getDispatcherPath = () => {
    return Session.get('dispatcher.path');
};

export const resetDispatcher = () => {
    Session.set('dispatcher.path', undefined);
};

/**
 * Master key helpers
 */
export const setMasterKey = (masterKey) => {
    Session.set('masterKey', masterKey);
};

export const removeMasterKey = () => {
    Session.set('masterKey', undefined);
};

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