import {writable} from 'svelte/store';
import mapbox from "mapbox-gl";

function createBounds() {
    const {subscribe, set, update} = writable(undefined);

    return {
        subscribe,
        extend: (circles) => update(bounds => {
            if (circles && circles.length > 0) {
                var coordinates = circles[0].geometry.coordinates[0][0];
                var circlesBounds = circles.reduce((bounds, feature) => {
                    var circleBounds = feature.geometry.coordinates[0].reduce((inbds, coord) => {
                        return inbds.extend(coord);
                    }, new mapbox.LngLatBounds(coordinates, coordinates));
                    return bounds.extend(circleBounds);
                }, new mapbox.LngLatBounds(coordinates, coordinates));
                return circlesBounds;
            }
            return undefined;
        })
    };
}

export const bounds = createBounds();