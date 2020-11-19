<script>
    import { getContext } from 'svelte';

    let styles = [
        {id: 'light-v10', text: `Light`},
        {id: 'dark-v10', text: `Dark`},
        {id: 'streets-v11', text: `Streets`},
        {id: 'satellite-v8', text: `Sat`}
    ];

    let selected;

    const { getMap } = getContext('map');
    const map = getMap();

    function switchStyleOnMap() {
        map.setStyle('mapbox://styles/mapbox/' + selected);
    }

    // TODO set default style as config
</script>

<select name="style" bind:value={selected}
        on:change="{() => switchStyleOnMap()}"
        on:blur="{() => switchStyleOnMap()}">
    {#each styles as style}
        <option value={style.id} selected="{style.id == 'light-v10'}">
            {style.text}
        </option>
    {/each}
</select>

<style>
    select {
        display: block;
        height: 30px;
        position: absolute;
        right: 10px;
        bottom: 30px;
    }
</style>