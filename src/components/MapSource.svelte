<script>
    import MapboxCircle from 'mapbox-gl-circle'
    import turf from '@turf/turf'
    import {getContext, onDestroy, onMount, setContext} from "svelte";

    export let data;
    export let id;
    let source;
    let sourceCreated;

    const {getMap} = getContext('map');
    const map = getMap();

    setContext('source', {
        getMapSourceId: () => id
    });

    $: {
        if (!!data && ((data.constructor === Array && data.length > 0) || (data.constructor === Object))) {
            var iterable;
            if (typeof data[Symbol.iterator] === 'function') {
                iterable = data;
            } else {
                iterable = [data];
            }
            var collection = {
                "type": "FeatureCollection",
                "features": iterable
            };
            source = map.getSource(id);
            if (source) {
                source.setData(collection);
            } else {
                map.addSource(id, {
                    'type': 'geojson',
                    'data': collection
                });
                sourceCreated = true;
            }
        }
    }

    onMount(() => {
        return () => {
            sourceCreated = false;
            if (map.getLayer(id + '-outline')) {
                map.removeLayer(id + '-outline');
            }
            if (map.getLayer(id + '-fill')) {
                map.removeLayer(id + '-fill');
            }
            if (map.getSource(id)) {
                map.removeSource(id);
            }
        }
    })

</script>

{#if sourceCreated}
    <slot></slot>
{/if}