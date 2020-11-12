<svelte:head>
    <link rel='stylesheet'
          href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.2.0/mapbox-gl-geocoder.css'
          type='text/css'/>
</svelte:head>


<script>
    import {onMount, setContext} from 'svelte';
    import {mapStore} from '../utils/mapStore';

    import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

    let container;

    console.log('try geocoder...');
    var geocoder = new MapboxGeocoder({
        accessToken: $mapStore.mapboxgl.accessToken, // Set the access token
        mapboxgl: $mapStore.mapboxgl, // Set the mapbox-gl instance
        marker: true, // Use the geocoder's default marker style
    });
    $mapStore.map.addControl(geocoder, 'top-right');
</script>
