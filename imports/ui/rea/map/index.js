import {Template} from "meteor/templating";
import {ReactiveVar} from 'meteor/reactive-var';

import {VelibService, MapService} from '../../../startup/services';

import './components/popup';
import './index.html';

const templateName = 'rea.map.index';
Template[templateName].hooks({
    created() {
        this.location = new ReactiveVar();
    },
    rendered() {
        const map = MapService.loadMap('map');

        map.locate({
            setView: true,
            enableHighAccuracy: true
        });

        L.easyButton('fa-crosshairs fa-lg', (btn, map) => {
            map.setView(this.location.get() || [48.859266, 2.342015], 16)
        }).addTo(map);

        map.on('locationfound', (e) => {
            this.location.set({lat: e.latitude, lng: e.longitude});
            L.circleMarker(e.latlng, {
                opacity: 1,
                fill: true,
                fillOpacity: 1
            }).addTo(map);
        });

        VelibService.fetchStations('Paris', data => {
            const markers = MapService.getMarkerClusters(data);
            map.addLayer(markers);
        });

    }
});

Template[templateName].helpers({});
