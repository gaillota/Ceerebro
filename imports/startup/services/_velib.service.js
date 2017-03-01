import 'whatwg-fetch';

import {NotificationService} from './';

export const VelibService = (function () {
    const apiKey = Meteor.settings.public.api.velib.apiKey;
    const baseUrl = "https://api.jcdecaux.com/vls/v1";

    /**
     * Fetch stations from API and return an ES6 Promise
     *
     * @param contract
     * @param handler
     */
    function fetchStations(contract = 'Paris', handler) {
        if (!apiKey) {
            NotificationService.error('No API key for JCDecaux API. Please provide one.');
            return;
        }

        const path = '/stations?contract=' + contract;
        const url = baseUrl + path + '&apiKey=' + apiKey;

        fetch(url)
            .then(res => res.json())
            .then(handler)
            .catch((error) => {
                NotificationService.error('Could not retrieve stations...');
                console.log(error);
            });
    }

    return {
        fetchStations: fetchStations
    };
})();
