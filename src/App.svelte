<script>
    import {onMount} from 'svelte';
    import {records} from './utils/data.js'
    import Map from "./components/Map.svelte";
    import List from "./components/List.svelte";
    import Marker from "./components/Marker.svelte";
    import ListItem from "./components/ListItem.svelte";

    onMount(async () => {
        await records.update();
    });
</script>

{#if $records !== []}
    <Map>
        {#each $records as record}
            <Marker {record} />
        {/each}
    </Map>

    <List>
        {#each $records as record}
            <ListItem {record} />
        {/each}
    </List>
{/if}