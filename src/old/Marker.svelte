<script>
    import {onMount} from 'svelte'
    import {mapStore} from '../utils/mapStore';
    import config from '../../app.config'

    export let record;

    let {lat, lon} = record.geolocalisation;
    var el = document.createElement('div');
    el.className = 'marker';
    el.dataset['recordid'] = record.recordid;

    var i = document.createElement('i');
    i.style = "color: " + config.pictos[record.type_de_commerce].color;
    i.classList.add(config.pictos[record.type_de_commerce].fontclass);
    el.appendChild(i);

    el.addEventListener('click', (e) => {
        var li = document.querySelector('.listitem[data-recordid="' + e.target.dataset['recordid'] + '"]');
        if (li) {
            li.scrollIntoView({behavior: 'smooth'});
            li.classList.add('highlighted');
            setInterval(() => {
                li.classList.remove('highlighted');
            }, 1000);
        }
    });

    const marker = new $mapStore.mapboxgl.Marker(el)
            .setLngLat([lon, lat]);
    $mapStore.bounds.extend([lon, lat]);
    $mapStore.map.fitBounds($mapStore.bounds, {padding: {bottom: 100, top: 100, left: 350, right: 80}});

    onMount(() => {
        marker.addTo($mapStore.map);

        return () => marker.remove();
    });
</script>


<style lang="scss" global>
    @import "../style/bulma-custom";

    .marker {
        width: 28px;
        height: 28px;
        display: flex;
        background-color: $light-100;
        border: 1px solid black;
        border-radius: 1000px;
        cursor: pointer;
        transition: all 0.2s linear;
        align-items: center;
        justify-content: center;

        > * {
            pointer-events: none;
        }
        *[class^="icon-"],
        *[class*=" icon-"] {
            font-size: 18px;
            text-align: center;
        }

        &:hover,
        &.mousehover {
            width: 36px;
            height: 36px;
            background-color: $light-200;
            border-width: 2px;
            z-index: 1000;

            *[class^="icon-"],
            *[class*=" icon-"] {
                font-size: 24px;
            }
        }
    }
</style>