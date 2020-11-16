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

/*******/


/*


export const endpoint 					= 'https://api.openbrewerydb.org/breweries'

export const isLoading 					= writable(false)
export const error     					= writable(null)

export const isAddingUser				= writable(false)
export const errorAddingUser			= writable(false)

export const users				  		= writable([])

const map;
const bounds;

export const init = (mapboxOptions) => {

}

export const flyTo = () => {

}

export const setStyle = () => {

}


export const receiveUsersSuccess = (data) => {
    // Do any needed data transformation to the received payload here
    users.set(data)
    isLoading.set(false)
}
export const receiveUsersError = (error) => {
    // handle error
    isLoading.set(false)
}*/
