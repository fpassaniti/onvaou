import {writable} from 'svelte/store';
import turf from '@turf/turf'
import {b64_to_utf8} from "./utils";

const configRE = /\?config=((?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?)/;
const lnglatnameRE = /^\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?),[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),(\d+),(.*)$/;

var counter = 1;

function createStore() {
    const {subscribe, update} = writable({});

    function createTurfCircle(marker) {
        var circle = turf.circle(
            marker.center,
            marker.radius,
            {
                units: 'meters'
            }
        );
        const nieme = counter++;
        circle.properties['center'] = marker.center;
        circle.properties['radius'] = marker.radius;
        circle.properties['id'] = "circle-" + nieme;
        circle.properties['fillId'] = circle.properties['id'] + "-fill";
        circle.properties['outlineId'] = circle.properties['id'] + "-outline";
        circle.properties['name'] = marker.name || ("Cercle #" + nieme);
        return circle;
    }

    return {
        subscribe,
        init: () => update(obj => {
            const uri = window.location.search;
            var matches = configRE.exec(uri);
            if (matches && matches[1]) {
                var config = b64_to_utf8(matches[1]);
                console.log(config);
                config.split('|').forEach((circleParam) => {
                    if (circleParam) {
                        var matchesCircleParam = lnglatnameRE.exec(circleParam);
                        if (matchesCircleParam && matchesCircleParam[1] && matchesCircleParam[7]) {
                            console.log(matchesCircleParam);
                            const lng = matchesCircleParam[1];
                            const lat = matchesCircleParam[7];
                            const rad = matchesCircleParam[10];
                            const nam = b64_to_utf8(matchesCircleParam[11]);
                            const circle = createTurfCircle({center:[lng,lat],radius:rad,name:nam});
                            obj[circle.properties['fillId']] = circle;
                        }
                    }
                })
            }
            return obj;
        }),
        add: (marker) => update(obj => {
            const circle = createTurfCircle(marker);
            obj[circle.properties['fillId']] = circle;

            console.log("New circle in the store:" + circle.properties['fillId']);
            return obj;
        }),
        remove: (fillId) => update(obj => {
            delete obj[fillId];
            return obj;
        }),
        updateCircleName: (fillId, newname) => update(obj => {
            obj[fillId].properties['name'] = newname;
            return obj;
        })
    };
}

export const circles = createStore();