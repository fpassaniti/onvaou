<script>
    import {onMount} from 'svelte';
    import Map from "./components/Map.svelte";
    import List from "./components/List.svelte";
    import ListItem from "./components/ListItem.svelte";
    import GeolocateControl from "./components/GeolocateControl.svelte";
    import Geocoder from "./components/Geocoder.svelte";
    import MapStyleSelect from "./components/MapStyleSelect.svelte";
    import {geojson} from './utils/store2'

    onMount(async () => {
        //await $geojson.updateData();
    });
</script>


<Map>
    <GeolocateControl></GeolocateControl>
    <Geocoder></Geocoder>
    <!--<MapStyleSelect></MapStyleSelect>-->
    {#if $geojson.features !== []}
        <List>
            {#each $geojson.features as feature}
                <ListItem {feature}/>
            {/each}
        </List>
    {/if}
</Map>



<style global lang="scss">
    @import "style/main.scss";
</style>