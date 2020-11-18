import {writable} from 'svelte/store';
import config from '../../app.config';
import mapbox from 'mapbox-gl';

function createPosition() {
    const {subscribe, set, update} = writable([]);

    const initMapPositionFromConfig = () => {
        return config.mapbox.init.center;
    };

    return {
        subscribe,
        init() {
            set(initMapPositionFromConfig())
        },
        flyTo(coord) {
            set(coord);
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
        init_or_reset() {
            set(initMapBounds())
        },
        extend(coord) {
            update((bounds) => bounds.extend(coord))
        }
    };
}

export const position = createPosition();
export const bounds = createBounds();