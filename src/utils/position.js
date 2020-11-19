import {writable} from 'svelte/store';
import config from '../../app.config';
import mapbox from 'mapbox-gl';


function createUserGeolocation() {
    const {subscribe, set} = writable(undefined);

    return {
        subscribe,
        geolocate(coord) {
            set(coord);
        },
        end() {
            set(undefined);
        }
    };
}

function createMapPosition() {
    const {subscribe, set} = writable(undefined);

    /*const initMapPositionFromConfig = () => {
        return config.mapbox.init.center;
    };*/

    return {
        subscribe,
        flyTo(coord) {
            set(coord);
        }
    };
}

function createListPosition() {
    const {subscribe, set} = writable(undefined);

    return {
        subscribe,
        scrollTo(feature_id) {
            set(feature_id);
        },
        reset() {
            set(undefined);
        }
    };
}

function createBounds() {
    const {subscribe, set, update} = writable(undefined);

    const initMapBounds = () => {
        return new mapbox.LngLatBounds();
    };

    return {
        subscribe,
        init_or_reset(geojson) {
            var bounds = initMapBounds();
            geojson.features.forEach((feature) => {
                bounds.extend(feature.geometry.coordinates);
            });
            console.log('map bounds updated');
            set(bounds)
        },
        /*extend(coord) {
            update((bounds) => bounds.extend(coord))
        }*/
    };
}

export const userGeolocation = createUserGeolocation();
export const mapPosition = createMapPosition();
export const listPosition = createListPosition();
export const bounds = createBounds();