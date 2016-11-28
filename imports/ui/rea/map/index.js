import {Template} from "meteor/templating";
import {ReactiveVar} from 'meteor/reactive-var';

import {Notification} from '../../../startup/services/notification.service';
import {VelibService} from '../../../startup/services/velib.service';
import {MapService} from '../../../startup/services/map.service';
import {GeocodingService} from '../../../startup/services/geocoding.service';

import './components/popup';
import './index.html';

Template["rea.map.index"].hooks({
    created() {
        this.location = new ReactiveVar();
    },
    rendered() {
        const map = MapService.loadMap('map');

        map.locate({
            setView: true,
            enableHighAccuracy: true
        });

        map.on('locationfound', (e) => {
            const radius = e.accuracy / 6;

            this.location.set({lat: e.latitude, lng: e.longitude});
            L.circle(e.latlng, radius).addTo(map);
        });

        GeocodingService.geocode("4 allée de la Ferme", (data) => {
            console.log(data);
        });

        VelibService.fetchStations('Paris', data => {
            const markers = MapService.getMarkerClusters(data);
            map.addLayer(markers);
        });

    }
});

Template["rea.map.index"].helpers({});