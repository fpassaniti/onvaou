<svelte:head>
    <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" />
    <link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.2.0/mapbox-gl-geocoder.css' type='text/css' />

    <link rel="stylesheet" href="/static/fonts/style.css"/>
</svelte:head>

<script>
    import { onMount } from 'svelte';
    import mapbox from 'mapbox-gl';

    import { geojson } from '../utils/store2'
    import config from '../../app.config'

    mapbox.accessToken = config.mapbox.apikey;

    let container;
    let map;
    let bounds;
    let value;

    $: map && map.getSource('data') && map.getSource('data').setData($geojson) && console.log('map source updated !');

    var layers = [];

    onMount(async () => {
        await geojson.updateData();

        map = new mapbox.Map({
            container,
            style: 'mapbox://styles/mapbox/light-v10',
            center: config.mapbox.init.center,
            zoom: config.mapbox.init.zoom
        });

        map.on('load', () => {
            console.log('call map on load');
            map.addSource('data', {
                type: 'geojson',
                data: $geojson
            });

            var symbols = $geojson.features.reduce((acc, feature) => {
                if (!feature.properties['type']) {
                    return acc;
                }
                var test = feature.properties['type'];
                if (acc.includes(test)) {
                    return acc;
                } else {
                    return [...acc, test];
                }
            }, []);
            symbols.forEach(function (symbol) {
                var layerID = 'poi-' + symbol;
                map.loadImage('/static/img/' + symbol + '.png', (error, image) => {
                    if (error) throw error;
                    map.addImage(symbol, image);
                    map.addLayer({
                        'id': layerID,
                        'type': 'symbol',
                        'cluster': false,
                        'source': 'data',
                        'layout': {
                            'icon-image': symbol,
                            'icon-size': 0.3,
                            'icon-allow-overlap': true,
                            "text-field": "{name}",
                            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                            "text-size": 13,
                            "text-offset": [0, 0.6],
                            "text-anchor": "top"
                        },
                        //'filter': ['==', ['get', 'type'], symbol]
                        //'filter': ['==', "{type}", symbol]
                        //'filter': ["match", symbol, ["get", "type"], true, false]
                        'filter': ['==', 'type', symbol]
                    });
                    layers.push(layerID);
                });
            });
        });

        map.on('mousemove', function(e) {
            var items = map.queryRenderedFeatures(e.point, {
                layers: layers
            });
            if (items.length > 0) {
                document.getElementById('mouse').innerHTML = '<h3><strong>' + items[0].properties.name + '</strong></h3>';
            } else {
                document.getElementById('mouse').innerHTML = '<p>Hover over an item!</p>';
            }
        });

        bounds = new mapbox.LngLatBounds();
    });

    async function test() {
        console.log('click');
        console.log('value : ' + value);
        await geojson.updateData(value);
    }

</script>

<button on:click={test}>Test</button>
<input type="text" on:change={test} bind:value={value}/>
<div id="mouse"></div>

<div id="this-is-not-a-map" bind:this={container}>
    <slot></slot>
</div>

<style lang="scss" global>
    #this-is-not-a-map {
        position: fixed;
        /*top: 0;*/
        left: 0;
        right: 0;
        bottom: 0;
        height: 90vh;
        width: 100vw;
    }
</style>