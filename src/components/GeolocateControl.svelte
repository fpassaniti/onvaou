<svelte:head>
    <script src="https://npmcdn.com/@turf/turf/turf.min.js"></script>
</svelte:head>

<script>
    import { getContext } from 'svelte';
    import { scrollToTop } from '../utils/helpers';
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
    geolocate.on('geolocate', async (e) => {
        console.log('Geolocate to : ' + e.coords.latitude + ', ' + e.coords.longitude);
        await records.sortData(e.coords.latitude, e.coords.longitude);
        scrollToTop();
    });
    map.addControl(geolocate, position);
</script>
