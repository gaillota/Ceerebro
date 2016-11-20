import {Blaze} from 'meteor/blaze';
import 'leaflet';
import 'leaflet-providers';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';

export const MapService = (function () {
    const config = Meteor.settings.public.api.mapBox;

    /**
     * Load map into the HTML element with {idContainer} as id
     * @param idContainer
     */
    function loadMap(idContainer) {
        L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images/';
        const map = L.map(idContainer, {
            attributionControl: false,
            minZoom: 3
        });
        L.tileLayer.provider('MapBox', {
            id: config.id,
            accessToken: config.accessToken
        }).addTo(map);
        map.setView([48.859266, 2.342015], 13);

        return map;
    }

    function getMarkerClusters(stations) {
        const markers = L.markerClusterGroup({
            showCoverageOnHover: false
        });

        stations.forEach(function (station) {
            const marker = _getMarker(station);

            marker.bindPopup("Loading...");
            marker.on('click', function() {
                const div = document.createElement('div');
                Blaze.renderWithData(Template["rea.map.popup"], station, div);
                marker.bindPopup(div).openPopup();
            });

            markers.addLayer(marker);
        });

        return markers;
    }

    function _getMarker(station, opt = {}) {
        const ratio = Math.round(station.available_bikes / station.bike_stands * 100);
        let color;
        if (ratio < 10) {
            color = '#ff3860';
        } else if (ratio < 50) {
            color = '#ffdd57';
        } else {
            color = '#23d160';
        }

        const options = {
            ...opt,
            riseOnHover: true,
            icon: L.divIcon({
                iconSize: [48, 48],
                popupAnchor: [0, -51],
                html: `<div class="leaflet-marker bounce" style="background: linear-gradient(to top right, ${color} ${ratio}%, white ${ratio}%);"></div>`
            })
        };

        return L.marker([station.position.lat, station.position.lng], options);
    }

    return {
        loadMap: loadMap,
        getMarkerClusters: getMarkerClusters
    };
})();