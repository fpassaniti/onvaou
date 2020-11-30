<svelte:head>
    <link rel='stylesheet'
          href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.2.0/mapbox-gl-geocoder.css'
          type='text/css'/>
</svelte:head>

<script>
    import {getContext} from 'svelte';
    import config from '../../app.config'

    import mapbox from 'mapbox-gl';
    import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

    let container;

    const { getMap } = getContext('map');
    const map = getMap();

    var geocoder = new MapboxGeocoder({
        accessToken: config.mapbox.apikey, // Set the access token
        mapboxgl: mapbox, // Set the mapbox-gl instance
        marker: true, // Use the geocoder's default marker style
        bbox: config.mapbox.geocoder.searchbbox,
        placeholder: config.mapbox.geocoder.placeholder
    });



    map.addControl(geocoder, 'top-left');
</script>

<style lang="scss" global>
    .mapboxgl-ctrl-geocoder--icon-search {
        top: 5px !important;
    }
    .mapboxgl-ctrl-geocoder--input {
        height: 30px !important;
        font-size: 0.8em !important;
    }
    .mapboxgl-ctrl-geocoder--icon-close {
        margin-top: 0 !important;
        margin-right: 0 !important;
    }
    .mapboxgl-ctrl-geocoder .mapboxgl-ctrl-geocoder--pin-right > * {
        top: 5.5px !important;
    }
</style>