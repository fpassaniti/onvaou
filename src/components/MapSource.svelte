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
        //console.log('Source [' + id + '] react : ' + JSON.stringify(data))
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
                //console.log('Source [' + id + '] updated with new data');
            } else {
                map.addSource(id, {
                    'type': 'geojson',
                    'data': collection
                });
                sourceCreated = true;
                //console.log('Source [' + id + '] created');
            }
        }
    }

    onMount(() => {
        return () => {
            sourceCreated = false;
            if (map.getLayer(id + '-outline')) {
                console.log("Destroying " + id + '-outline')
                map.removeLayer(id + '-outline');
            }
            if (map.getLayer(id + '-fill')) {
                console.log("Destroying " + id + '-fill')
                map.removeLayer(id + '-fill');
            }
            if (map.getSource(id)) {
                console.log("Destroying " + id);
                map.removeSource(id);
            }
        }
    })

</script>

{#if sourceCreated}
    <slot></slot>
{/if}