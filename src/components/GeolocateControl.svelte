<svelte:head>
    <script src="https://npmcdn.com/@turf/turf/turf.min.js"></script>
</svelte:head>

<script>
    import { getContext } from 'svelte';
    import mapbox from 'mapbox-gl';
    import { userGeolocation } from '../utils/position'

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
        userGeolocation.geolocate(e.coords);
    });
    geolocate.on('trackuserlocationend', function() {
        console.log('Geolocate ending !');
        userGeolocation.end();
    });
    map.addControl(geolocate, position);
</script>
