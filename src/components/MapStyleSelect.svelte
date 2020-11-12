<script>
    import {mapStore} from '../utils/mapStore';

    let styles = [
        {id: 'light-v10', text: `Light`},
        {id: 'dark-v10', text: `Dark`},
        {id: 'streets-v11', text: `Streets`}
    ];

    let selected;

    function switchStyleOnMap() {
        $mapStore.map.setStyle('mapbox://styles/mapbox/' + selected);
    }

    // TODO set default style as config
</script>

<select name="style" bind:value={selected}
        on:change="{() => switchStyleOnMap()}"
        on:blur="{() => switchStyleOnMap()}">
    {#each styles as style}
        <option value={style.id} selected="{style.id == 'streets-v11'}">
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