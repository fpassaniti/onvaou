import {derived} from "svelte/store";
import {circles} from "./circles"
import turf from '@turf/turf'

const empty = {
    "type": "Feature",
    "properties": {},
    "geometry": {
        "type": "Polygon",
        "coordinates": []
    }
};


export const intersection = derived(
    circles,
    $circles => {
        if (Object.keys($circles).length > 1) {
            var prev, current, lastId;
            for (let i = 0; i < Object.values($circles).length; i++) {
                var feature = Object.values($circles)[i];
                lastId = feature.properties['fillId']
                current = turf.polygon(feature.geometry.coordinates, {"fill": "#0f0"});
                if (prev == undefined) {
                    prev = current;
                }
                prev = turf.intersect(prev, current);
                if (prev === null) { // intersect failed ! impossible for these circles
                    break;
                }
            }
            if (prev !== null) { // no intersection
                prev.properties['id'] = 'intersection';
                prev.properties['fillId'] = 'intersection-fill';
                prev.properties['outlineId'] = 'intersection-outline';
                prev.properties['color'] = 'green';
                prev.properties['opacity'] = 0.3;
            }
            return prev;
        } else {
            return null;
        }
    }
);