<script>
    import MapboxCircle from 'mapbox-gl-circle'
    import turf from '@turf/turf'
    import {getContext, onDestroy, onMount} from "svelte";

    const { getMap } = getContext('map');
    const map = getMap();
    const { getMapSourceId } = getContext('source');
    const source = getMapSourceId();

    export let fill;
    export let outline;

    onMount(() => {
        if (fill) {
            map.addLayer({
                "id": source + '-fill',
                "type": "fill",
                "source": source,
                "paint": fill
            });
        }

        if (outline) {
            map.addLayer({
                "id": source + '-outline',
                "type": "line",
                "source": source,
                "paint": outline
            });
        }
    });
</script>