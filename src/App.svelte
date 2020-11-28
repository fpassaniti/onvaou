<script>
    import Nav from "./components/Nav.svelte";
    import Map from "./components/Map.svelte";
    import GeolocateControl from "./components/GeolocateControl.svelte";
    import Geocoder from "./components/Geocoder.svelte";
    import {circles} from "./utils/circles"
    import {intersection} from "./utils/intersection"
    import MapSource from "./components/MapSource.svelte";
    import MapLayer from "./components/MapLayer.svelte";
    import LocationSync from "./components/LocationSync.svelte";

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

    circles.init();
</script>

<LocationSync></LocationSync>

<Nav></Nav>
<Map>
    <GeolocateControl></GeolocateControl>
    <Geocoder></Geocoder>
    {#if Object.keys($circles).length > 0}
        <MapSource id="circle" data={Object.values($circles)}>
            <MapLayer fill={circlesFill} outline={circlesOutline}></MapLayer>
        </MapSource>
    {/if}
    {#if $intersection !== null}
        <MapSource id="intersection" data={$intersection}>
            <MapLayer fill={intersectFill} outine={intersectOutline}></MapLayer>
        </MapSource>
    {/if}
</Map>

<style lang="scss" global>
    @import "style/main";
</style>