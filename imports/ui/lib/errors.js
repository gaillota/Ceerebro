import {_} from 'lodash';

import {NotificationService} from '../../startup/services';

export const displayError = (error) => {
    if (error) {
        NotificationService.error(error.reason || error.toString())
    }
};
