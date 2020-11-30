<script>
    import Nav from "./components/Nav.svelte";
    import Map from "./components/Map.svelte";
    import GeolocateControl from "./components/GeolocateControl.svelte";
    import Geocoder from "./components/Geocoder.svelte";
    import {circles} from "./utils/circles"
    import {intersection} from "./utils/intersection"
    import {bounds} from "./utils/bounds"
    import MapSource from "./components/MapSource.svelte";
    import MapLayer from "./components/MapLayer.svelte";
    import LocationSync from "./components/LocationSync.svelte";
    import {onMount} from "svelte";

    let open;
    let openbtn;

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

    circles.init(); // init circles from URL config
    bounds.extend(Object.values($circles));

    onMount(() => {
        openbtn.addEventListener('click', (e) => {
            open = true;
        });
    });
</script>

<LocationSync></LocationSync>

<div class="app-container">
    <Nav bind:open={open}></Nav>

    <div class="header-container is-flex is-justify-content-space-between is-align-items-center is-mobile">
        <div class="is-flex is-align-items-center is-mobile">
            <a bind:this={openbtn}
               role="button" class="navbar-burger burger" aria-label="menu" aria-expanded={open?true:false}>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
            <div class="header-content">
                <h1 class="title is-2 ml-3 is-light has-text-weight-light">On va où ?</h1>
                <h3 class="subtitle is-6 ml-3 has-text-dark has-text-weight-light">Cliquez, tracez et retrouvez vous !</h3>
            </div>
        </div>

        <img class="p-3" src="/static/img/logo128.png"/>
    </div>
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
</div>

<style lang="scss" global>
    @import "style/main";

    .app-container {
        height: 100%;
    }

    .navbar-burger {
        display: block !important;
        margin-left: inherit;
        height: 4.95rem;
        width: 4.95rem;
    }

    .header-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 70px;
        background-color: #fff;
        box-shadow: 0 1px 4px rgba(0, 0, 0, .07);
        z-index: 5;

        img {
            height: 100%;
        }

        @media screen and (min-width: $tablet) {
            .header-content {
                display: flex;
                justify-content: center;
                align-items: baseline;

                > * {
                    margin-top: 0;
                    margin-bottom: 0;
                }
            }
        }
    }
</style>