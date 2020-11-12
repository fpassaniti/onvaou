<script>
    import { onMount } from 'svelte'
    import { mapStore } from '../utils/mapStore';

    export let record;

    let { lat, lon } = record.geolocalisation;
    var el = document.createElement('div');
    el.className = 'marker';
    el.dataset['recordid'] = record.recordid;
    el.addEventListener('click', (e) => {
        var li = document.querySelector('.listitem[data-recordid="' + e.target.dataset['recordid'] + '"]');
        if (li) {
            li.scrollIntoView({ behavior: 'smooth' });
            li.classList.add('highlighted');
            setInterval(() => {
                li.classList.remove('highlighted');
            }, 1000);
        }
    });

    const marker = new $mapStore.mapboxgl.Marker(el)
            .setLngLat([lon, lat]);
    $mapStore.bounds.extend([lon, lat]);
    $mapStore.map.fitBounds($mapStore.bounds, { padding: { bottom: 100, top: 100, left: 350, right: 80 } });

    onMount(() => {
        marker.addTo($mapStore.map);
        return () => marker.remove();
    });
</script>


<style lang="scss" global>
    .marker {
        width: 13px;
        height: 13px;
        border-radius: 1000px;
        background: black;
        border: 2px solid lightgreen;
        cursor: pointer;

        &.mousehover {
            border-color: red;
            z-index: 1000;
        }
    }
</style>