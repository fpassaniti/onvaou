<svelte:head>
    <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" />
    <link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.2.0/mapbox-gl-geocoder.css' type='text/css' />
</svelte:head>

<style lang="scss" global>
    // @import '~mapbox-gl/dist/mapbox-gl.css';

    #this-is-not-a-map {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100vh;
        width: 100vw;
    }
</style>


<script>
    import {onMount, setContext} from 'svelte';
    import mapbox from 'mapbox-gl/dist/mapbox-gl.js';
    //import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

    mapbox.accessToken = 'pk.eyJ1IjoiZnBhc3Nhbml0aSIsImEiOiIxNTg3MGRlZWQyNjVkZjExMGVlNWVjNDFjOWQyNzNiMiJ9.pYKDlO4v-SNiDz08G9ZZoQ';

    let map;
    let container;
    let bounds = new mapbox.LngLatBounds();
    let geocoder;

    setContext('mapbox', {
        mapbox: mapbox,
        getMap: () => map,
        bounds: bounds
    });

    onMount(() => {
        map = new mapbox.Map({
            container,
            style: 'mapbox://styles/mapbox/outdoors-v11',
            center: [45.406164, 5.765444]
        });
        map.addControl(new mapbox.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        }));

        /*geocoder = new MapboxGeocoder({
            accessToken: mapbox.accessToken, // Set the access token
            mapbox: mapbox, // Set the mapbox-gl instance
            marker: true, // Use the geocoder's default marker style
            bbox: [-77.210763, 38.803367, -76.853675, 39.052643] // Set the bounding box coordinates
        });

        map.addControl(geocoder, 'top-right');*/
    });
</script>

<div id="this-is-not-a-map" bind:this={container}>
    {#if map}
        <slot></slot>
    {/if}
</div>