<script>
    import Map from "./components/Map.svelte";
    import GeolocateControl from "./components/GeolocateControl.svelte";
    import Geocoder from "./components/Geocoder.svelte";
    import {circles} from "./utils/circles"
    import {intersection} from "./utils/intersection"
    import MapSource from "./components/MapSource.svelte";
    import MapLayer from "./components/MapLayer.svelte";

    const circlesFill = {
        "fill-color": "lightblue",
        "fill-opacity": 0.25
    };
    const circlesOutline = {
        "line-color": "lightblue",
        "line-opacity": 0.45,
        "line-width": 2,
        "line-offset": 1
    };
    const intersectFill = {
        "fill-color": "green",
        "fill-opacity": 0.5
    };
    const intersectOutline = {
        "line-color": "green",
        "line-opacity": 0.45,
        "line-width": 2,
        "line-offset": 1
    };
</script>

<Map>
    <GeolocateControl></GeolocateControl>
    <Geocoder></Geocoder>
    <MapSource id="circle" data={Object.values($circles)}>
        <MapLayer fill={circlesFill} outline={circlesOutline}></MapLayer>
    </MapSource>
    {#if $intersection !== null}
        <MapSource id="intersection" data={$intersection}>
            <MapLayer fill={intersectFill} outine={intersectOutline}></MapLayer>
        </MapSource>
    {/if}

        <!--{#if $intersec}
        <Intersect geojson={$intersec}></Intersect>
    {/if}-->
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