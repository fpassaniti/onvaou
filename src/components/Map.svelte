<svelte:head>
    <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"/>
    <link rel='stylesheet'
          href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.2.0/mapbox-gl-geocoder.css'
          type='text/css'/>
</svelte:head>

<script>
    import {onMount, setContext} from 'svelte';
    import mapbox from 'mapbox-gl';
    import {circles} from '../utils/circles';
    import {bounds} from '../utils/bounds';
    import config from '../../app.config';
    import turf from '@turf/turf';

    mapbox.accessToken = config.mapbox.apikey;

    let container;
    let map;
    let loaded;
    let button;
    var popup;

    setContext('map', {
        getMap: () => map
    });

    $: $bounds && map && map.fitBounds($bounds, {
        padding: {top: 90, bottom: 20, left: 20, right: 20}
    });

    onMount(() => {
        map = new mapbox.Map({
            container,
            style: config.mapbox.style,
            center: config.mapbox.init.center,
            zoom: config.mapbox.init.zoom
        });
        map.addControl(new mapbox.NavigationControl());

        map.on('load', () => {
            loaded = true;
        });

        map.on('click', (e) => {
            const el = document.createElement('div');
            el.classList.add('popup', 'p-4');
            const button = document.createElement('button');
            button.innerText = "Ajouter un cercle ici";
            button.classList.add('button', 'is-primary', 'is-outlined');
            button.addEventListener('click', () => {
                const coords = e.lngLat;
                circles.add({center: [parseFloat(coords.lng), parseFloat(coords.lat)], radius: 20000});
                const mapBounds = map.getBounds();
                if (turf.distance(
                    [mapBounds.getNorthWest().lng,mapBounds.getNorthWest().lat],
                    [mapBounds.getSouthEast().lng,mapBounds.getSouthEast().lat],{units: 'meters'}) <= 80000) {
                    bounds.extend(Object.values($circles));
                }
                popup.remove();
            });
            el.appendChild(button);

            if (map.getLayer('circle-fill')) {
                var features = map.queryRenderedFeatures(e.point, {'layers': ['circle-fill']});
                features.forEach((feature) => {
                    var circlebutton = document.createElement('button');
                    circlebutton.innerText = "Supprimer " + feature.properties['name'];
                    circlebutton.classList.add('button', 'is-danger', 'is-outlined', 'mb-1');
                    circlebutton.addEventListener('click', () => {
                        const id = feature.properties['fillId'];
                        circles.remove(id);
                        popup.remove();
                    });
                    el.appendChild(circlebutton);
                });
            }

            popup = new mapbox.Popup()
                    .setDOMContent(el)
                    .setLngLat(e.lngLat)
                    .addTo(map);
        });
    })

</script>

<div id="this-is-not-a-map" bind:this={container}>
    {#if loaded}
        <slot></slot>
    {/if}
</div>

<style lang="scss" global>
    @import "../style/bulma-custom";

    #this-is-not-a-map {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100%;
        width: 100%;
    }

    .mapboxgl-canvas {
        &:focus {
            outline: none;
        }
    }

    .mapboxgl-ctrl-top-left,
    .mapboxgl-ctrl-top-right {
        top: 70px !important;
    }

    .mapboxgl-marker > * { // keep click event no marker and not the svg inside
        pointer-events: none;
    }

    .mapboxgl-popup-content {
        padding: 0 !important;
    }

    .popup .button {
        width: 100%;
        height: auto;
        white-space: pre-wrap;
        margin-bottom: $size-3;

        &:last-child {
            margin-bottom: 0;
        }
    }
</style>