<script>
    import Map from "./components/Map.svelte";
    import GeolocateControl from "./components/GeolocateControl.svelte";
    import Geocoder from "./components/Geocoder.svelte";
    import Marker from "./components/Marker.svelte";
    import {store} from "./utils/store"
    import {onMount} from "svelte";

    let lat
    let lng
    let add

    onMount(() => {
        add.addEventListener('click', () => {
            store.add({center: [parseFloat(lat), parseFloat(lng)], radius: 20000});
        })
    })
</script>

<div>
    <input type="text" bind:value={lat}/>
    <input type="text" bind:value={lng}/>
    <button type="button" bind:this={add} value="ajouter">Ajouter</button>
</div>

<Map>
    <GeolocateControl></GeolocateControl>
    <Geocoder></Geocoder>
    {#each $store as item}
        <Marker lat={item.center[0]} lng={item.center[1]} rad={item.radius}></Marker>
    {/each}
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