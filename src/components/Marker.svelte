<script>
    import MapboxCircle from 'mapbox-gl-circle'
    import turf from '@turf/turf'
    import {getContext, onDestroy, onMount} from "svelte";

    export let geojson;

    const { getMap } = getContext('map');
    const map = getMap();

    onMount(() => {
        console.log("MOUNT Marker : " + geojson.properties['id']);

        map.addLayer({
            "id": geojson.properties['fillId'],
            "type": "fill",
            "source": 'circles',
            "paint": {
                "fill-color": geojson.properties['color'] || "lightblue",
                "fill-opacity": geojson.properties['opacity'] || 0.25
            }
        });
        map.addLayer({
            "id": geojson.properties['outlineId'],
            "type": "line",
            "source": geojson.properties['id'],
            "paint": {
                "line-color": geojson.properties['color'] || "lightblue",
                "line-opacity": (geojson.properties['opacity'] || 0.25) + 0.2,
                "line-width": 2,
                "line-offset": 1
            }
        });
    });
</script>