<svelte:head>
    <link rel='stylesheet'
          href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.2.0/mapbox-gl-geocoder.css'
          type='text/css'/>
</svelte:head>


<script>
    import {getContext} from 'svelte';
    import {config} from '../../app-config.yaml'

    import mapbox from 'mapbox-gl';
    import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

    let container;

    const { getMap } = getContext('map');
    const map = getMap();

    var geocoder = new MapboxGeocoder({
        accessToken: config.mapbox.apikey, // Set the access token
        mapboxgl: mapbox, // Set the mapbox-gl instance
        marker: true, // Use the geocoder's default marker style
        bbox: config.mapbox.geocoder.searchbbox
    });
    map.addControl(geocoder, 'top-right');
</script>
