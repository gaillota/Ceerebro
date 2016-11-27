import {Template} from "meteor/templating";

import {Notification} from '../../../startup/services/notification.service';
import {VelibService} from '../../../startup/services/velib.service';
import {MapService} from '../../../startup/services/map.service';

import './components/popup';
import './index.html';

Template["rea.map.index"].hooks({
    created() {
    },
    rendered() {
        const map = MapService.loadMap('map');

        map.locate({
            setView: true,
            enableHighAccuracy: true
        });

        map.on('locationfound', (e) => {
            const radius = e.accuracy / 6;
            L.circle(e.latlng, radius).addTo(map);
        });

        VelibService.fetchStations('Paris')
            .then(response => response.json())
            .then(data => {
                const markers = MapService.getMarkerClusters(data);
                map.addLayer(markers);
            })
            .catch((error) => {
                Notification.error('Could not retrieve stations...');
                console.log(error);
            });
    }
});

Template["rea.map.index"].helpers({});