import {derived} from "svelte/store";
import {circles} from "./circles"
import turf from '@turf/turf'

const empty = {
    "type": "Feature",
    "properties": {
        "id": "intersect",
        "fillId": "intersect-fill",
        "outlineId": "intersect-outline"
    },
    "geometry": {
        "type": "Polygon",
        "coordinates": []
    }
};


export const intersec = derived(
    circles,
    $circles => {
        console.log("INTERSECT TRIGGERED");
        if (Object.keys($circles).length > 1) {
            var prev, current, lastId;
            Object.values($circles).forEach((feature) => {
                lastId = feature.properties['fillId']
                console.log("Process: " + lastId);
                current = turf.polygon(feature.geometry.coordinates, {"fill": "#0f0"});
                if (prev == undefined) {
                    prev = current;
                }
                prev = turf.intersect(prev, current);
            });
            if (prev == null) { // no intersect
                return empty;
            } else {
                prev.properties['id'] = 'intersect';
                prev.properties['fillId'] = 'intersect-fill';
                prev.properties['outlineId'] = 'intersect-outline';
                prev.properties['color'] = 'green';
                prev.properties['opacity'] = 0.3;
                return prev;
            }
        } else {
            return empty;
        }
    }
);