<script>
    import {onMount} from 'svelte';
    import {records} from './utils/data.js'
    import Map from "./components/Map.svelte";
    import List from "./components/List.svelte";
    import Marker from "./components/Marker.svelte";
    import ListItem from "./components/ListItem.svelte";
    import GeolocateControl from "./components/GeolocateControl.svelte";
    import Geocoder from "./components/Geocoder.svelte";
    import MapStyleSelect from "./components/MapStyleSelect.svelte";

    onMount(async () => {
        //await records.update();
    });
</script>

{#if $records !== []}
    <Map>
        <!--<GeolocateControl></GeolocateControl>
        <Geocoder></Geocoder>
        <MapStyleSelect></MapStyleSelect>-->
        <!--{#each $records as record}
            <Marker {record} />
        {/each}-->
    </Map>

    <!--<List>
        {#each $records as record}
            <ListItem {record} />
        {/each}
    </List>-->
{/if}


<style global lang="scss">
    @import "style/main.scss";
</style>