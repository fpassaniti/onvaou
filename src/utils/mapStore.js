import {writable} from 'svelte/store';
import mapbox from 'mapbox-gl';
import { config } from '../../app-config.yaml'

mapbox.accessToken = config.mapbox.apikey;

function createMapStore() {
    const tools = {
        map: undefined,
        mapboxgl: undefined,
        bounds: undefined
    };
    const {subscribe, set, update} = writable(tools);

    const methods = {
        async init(mapboxOptions) {
            update(tools => {
                tools.map = new mapbox.Map(mapboxOptions);
                tools.mapboxgl = mapbox;
                tools.bounds = new mapbox.LngLatBounds();
                return tools
            });
        }
    };

    return {
        subscribe,
        set,
        update,
        ...methods
    };
}

export const mapStore = createMapStore();