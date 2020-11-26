<svelte:head>
    <script src="https://npmcdn.com/@turf/turf/turf.min.js"></script>
</svelte:head>

<script>
    import { getContext } from 'svelte';
    import mapbox from 'mapbox-gl';

    export let position = 'top-right';
    export let options = {
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    };

    const { getMap } = getContext('map');
    const map = getMap();

    var geolocate = new mapbox.GeolocateControl(options);
    map.addControl(geolocate, position);
</script>
