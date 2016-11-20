import 'whatwg-fetch';

export const VelibService = (function () {
    const baseUrl = "https://api.jcdecaux.com/vls/v1";
    const apiKey = Meteor.settings.public.api.velib.apiKey;

    /**
     * Fetch stations from API and return an ES6 Promise
     *
     * @param contract
     * @returns {*|Promise.<string>}
     */
    function fetchStations(contract = 'Paris') {
        const path = '/stations?contract=' + contract;
        const url = baseUrl + path + '&apiKey=' + apiKey;

        return fetch(url);
    }

    return {
        fetchStations: fetchStations
    };
})();