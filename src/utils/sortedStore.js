import {derived} from 'svelte/store'
import {userGeolocation} from "./position";
import {geojson} from "./store2";

function sortData(geojson, lat, lng) {
    geojson.features.forEach(feature => {
        Object.defineProperty(feature.properties, 'geolocate_distance', {
            value: turf.distance(
                [feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
                [lat, lng],
                {units: 'meters'}),
            writable: true,
            enumerable: true,
            configurable: true
        });
    });
    geojson.features.sort((a, b) => {
        if (a.properties.geolocate_distance >= b.properties.geolocate_distance)
            return 1;
        else
            return -1;
    })
    return geojson;
}

export const sortedGeojson = derived(
    [geojson, userGeolocation],
    ([$geojson, $userGeolocation]) => {
        if ($userGeolocation) {
            console.log('derived store ! geolocation !');
            var tmp = sortData($geojson, $userGeolocation.latitude, $userGeolocation.longitude);
            console.log(tmp);
            return tmp;
        } else {
            console.log('derived store ! geojson only (no geoloc) !');
            return $geojson;
        }
    }
);