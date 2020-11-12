<svelte:head>
    <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" />
    <link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.2.0/mapbox-gl-geocoder.css' type='text/css' />

    <link rel="stylesheet" href="/static/fonts/style.css"/>
</svelte:head>

<style lang="scss" global>
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
    import { onMount } from 'svelte';

    import { mapStore } from '../utils/mapStore';

    import { config } from '../../app-config.yaml'

    let container;

    onMount(async () => {
        console.log('onmount map');
        await mapStore.init({
            container,
            style: 'mapbox://styles/mapbox/outdoors-v11',
            center: config.mapbox.init.center,
            zoom: config.mapbox.init.zoom
        });
    });
</script>

<div id="this-is-not-a-map" bind:this={container}>
    {#if $mapStore.map}
        <slot></slot>
    {/if}
</div>