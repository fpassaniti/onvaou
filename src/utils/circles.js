import {writable} from 'svelte/store';
import turf from '@turf/turf'
import config from '../../app.config';
import {createEmptyGeojson, generateUUID} from "./utils";

function createStore() {
    const {subscribe, update} = writable({});

    return {
        subscribe,
        add: (marker) => update(obj => {
            var circle = turf.circle(
                marker.center,
                marker.radius,
                {
                    units: 'meters'
                }
            );
            circle.properties['id'] = "circle-" + generateUUID();
            circle.properties['fillId'] = circle.properties['id'] + "-fill";
            circle.properties['outlineId'] = circle.properties['id'] + "-outline";
            circle.properties['name'] = "Circle #" + circle.properties['id'];
            obj[circle.properties['fillId']] = circle;

            console.log("New circle in the store:" + circle.properties['fillId']);
            return obj;
        }),
        remove: (fillId) => update(obj => {
            delete obj[fillId];
            return obj;
        })
    };
}

export const circles = createStore();