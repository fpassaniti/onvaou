import {writable} from 'svelte/store';
import config from '../../app.config';

function createStore() {
    const {subscribe, set, update} = writable([]);

    return {
        subscribe,
        add: (marker) => update(list => [...list, marker])
    };
}

export const store = createStore();