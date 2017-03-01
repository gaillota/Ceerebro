import {_} from 'lodash';

import {NotificationService} from './';

export const GeocodingService = (function () {
    const apiKey = Meteor.settings.public.api.google.apiKey;
    const baseUrl = "https://maps.googleapis.com/maps/api/geocode/json";

    /**
     * Geocode address string into coordinate
     *
     * @param address
     * @param handler
     */
    function geocode(address, handler) {
        const params = {
            address: address,
            apiKey: apiKey
        };
        const url = baseUrl + _urlEncode(params);

        fetch(url)
            .then(res => res.json())
            .then(handler)
            .catch(error => {
                NotificationService.error('An error occured while calling Google API...');
                console.log(error);
            });
    }

    /**
     *
     * @param params
     * @returns {string}
     * @private
     */
    function _urlEncode(params) {
        let path = "?";

        _.forEach(params, (value, key) => {
            path += `${key}=${encodeURIComponent(value)}&`;
        });
        path.slice(1);

        return path;
    }

    return {
        geocode: geocode
    };
})();
