<script>
    import Map from "./components/Map.svelte";
    import GeolocateControl from "./components/GeolocateControl.svelte";
    import Geocoder from "./components/Geocoder.svelte";
    import Marker from "./components/Marker.svelte";
    import {circles} from "./utils/circles"
    import {intersec} from "./utils/intersec"
    import Intersect from "./components/Intersect.svelte";
</script>

<Map>
    <GeolocateControl></GeolocateControl>
    <Geocoder></Geocoder>
    {#each Object.values($circles) as item}
        <Marker geojson={item}></Marker>
    {/each}
    {#if $intersec}
        <Intersect geojson={$intersec}></Intersect>
    {/if}
</Map>

<style lang="scss">
    div {
        position: absolute;
        z-index: 1;
        top: 5px;
        left: 10px;
        background-color: white;
        display: block;
        padding: 10px 20px;
    }
</style>