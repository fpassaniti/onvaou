import {writable} from 'svelte/store';
import turf from '@turf/turf'
import config from '../../app.config';
import {generateUUID} from "./utils";

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

            /*if (Object.keys(obj).filter(key => key.startsWith('circle-')).length > 1) {
                var polygons = [];
                Object.values(obj).forEach((feature) => {
                    console.log("Process: " + feature.properties['id']);
                    if (feature.properties['id'].startsWith('circle-')) {
                        polygons.push(turf.polygon(feature.geometry.coordinates, {"fill": "#0f0"}));
                    }
                });
                var result = turf.intersect(...polygons);
                result.properties['id'] = 'intersect';
                result.properties['fillId'] = 'intersec-fill';
                result.properties['outlineId'] = 'intersec-outline';
                result.properties['color'] = 'green';
                result.properties['opacity'] = 0.3;
                console.log(JSON.stringify(result));
                obj['intersec-fill'] = result;
            } else {
                if (obj['intersec-fill']) {
                    obj['intersec-fill'] = undefined;
                }
            }*/

            return obj;
        })
    };
}

export const circles = createStore();