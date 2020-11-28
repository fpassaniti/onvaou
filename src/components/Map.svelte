<svelte:head>
    <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"/>
    <link rel='stylesheet'
          href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.2.0/mapbox-gl-geocoder.css'
          type='text/css'/>

    <link rel="stylesheet" href="static/fonts/style.css"/>
</svelte:head>

<script>
    import {onMount, setContext} from 'svelte';
    import mapbox from 'mapbox-gl';
    import {circles} from '../utils/circles';
    import config from '../../app.config'
    import turf from '@turf/turf'
    import turfintersect from '@turf/intersect'
    import turfunion from '@turf/union'

    mapbox.accessToken = config.mapbox.apikey;

    let container;
    let map;
    let loaded;
    let button;
    var popup;

    setContext('map', {
        getMap: () => map
    });

    onMount(() => {
        map = new mapbox.Map({
            container,
            style: config.mapbox.style,
            center: config.mapbox.init.center,
            zoom: config.mapbox.init.zoom
        });

        map.on('load', () => {
            loaded = true;
        })

        map.on('click', (e) => {
            const el = document.createElement('div');
            el.classList.add('popup', 'px-4', 'py-2');
            const button = document.createElement('button');
            button.innerText = "Ajouter un cercle ici";
            button.classList.add('button', 'is-primary', 'is-outlined', 'mb-3');
            button.addEventListener('click', () => {
                const coords = e.lngLat;
                circles.add({center: [parseFloat(coords.lng), parseFloat(coords.lat)], radius: 20000});
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

        button.addEventListener('click', (e) => {
            var prev, current;
            const sources = map.style.sourceCaches;
            console.log(Object.keys(sources));
            Object.keys(sources).forEach((key) => {
                if (key.startsWith('circle-')) {
                    const features = map.querySourceFeatures(key);
                    var polygons = [];
                    features.forEach((feature) => {
                        polygons.push(turf.polygon(feature.geometry.coordinates, {"fill": "#0f0"}));
                    });
                    current = turf.union(...polygons);
                    console.log(JSON.stringify(current));
                    if (prev == undefined) {
                        prev = current;
                    }
                    prev = turf.intersect(prev, current);
                }
            })
            console.log(JSON.stringify(prev));
        })
    })

</script>

<button id="log" bind:this={button}>Log circles union !</button>

<div id="this-is-not-a-map" bind:this={container}>
    {#if loaded}
        <slot></slot>
    {/if}
</div>

<style lang="scss" global>
    #log {
        position: absolute;
        right: 20px;
        bottom: 30px;
        z-index: 1;
    }

    #this-is-not-a-map {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100vh;
        width: 100%;
    }

    .mapboxgl-canvas {
        &:focus {
            outline: none;
        }
    }

    .mapboxgl-ctrl-top-right {
        display: flex;
        align-items: center;
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
    }
</style>