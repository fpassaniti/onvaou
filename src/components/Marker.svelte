<script>
    import MapboxCircle from 'mapbox-gl-circle'
    import {getContext, onMount} from "svelte";

    export let lat;
    export let lng;
    export let rad;

    const { getMap } = getContext('map');
    const map = getMap();

    onMount(() => {
        var myCircle = new MapboxCircle([lng, lat], rad, {
            editable: false,
            fillColor: '#29AB87'
        }).addTo(map);
    })

</script>