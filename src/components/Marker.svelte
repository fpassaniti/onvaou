<script>
    import MapboxCircle from 'mapbox-gl-circle'
    import turf from '@turf/turf'
    import {getContext, onDestroy, onMount} from "svelte";

    export let geojson;

    const { getMap } = getContext('map');
    const map = getMap();

    onMount(() => {
        console.log("MOUNT Marker : " + geojson.properties['id']);

        console.log(map.getStyle().layers);
        console.log(map.getLayer('intersect-fill'));

        var loadBefore = (map.getLayer('intersect-fill')?'intersect-fill':undefined);

        if (map.getLayer(geojson.properties['fillId'])) {
            map.removeLayer(geojson.properties['fillId']);
        }
        if (map.getLayer(geojson.properties['outlineId'])) {
            map.removeLayer(geojson.properties['outlineId']);
        }
        if (map.getSource(geojson.properties['id'])) {
            map.removeSource(geojson.properties['id']);
        }

        map.addSource(geojson.properties['id'], {
            'type': 'geojson',
            'data': geojson
        });
        map.addLayer({
            "id": geojson.properties['fillId'],
            "type": "fill",
            "source": geojson.properties['id'],
            "paint": {
                "fill-color": geojson.properties['color'] || "lightblue",
                "fill-opacity": geojson.properties['opacity'] || 0.25
            }
        }, loadBefore);
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
        }, loadBefore);
    });

    onDestroy(() => {
        if (map.getLayer(geojson.properties['fillId'])) {
            map.removeLayer(geojson.properties['fillId']);
        }
        if (map.getLayer(geojson.properties['outlineId'])) {
            map.removeLayer(geojson.properties['outlineId']);
        }
        if (map.getSource(geojson.properties['id'])) {
            map.removeSource(geojson.properties['id']);
        }
    });
</script>