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

    import {geojson} from '../utils/store2'
    import {mapPosition, listPosition, bounds} from '../utils/position'

    import config from '../../app.config'
    import {createDonutChart, createClusterProperties} from "../utils/mapHelpers";

    mapbox.accessToken = config.mapbox.apikey;

    let container;
    let map;

    // objects for caching and keeping track of HTML marker objects (for performance)
    var markers = {};
    var markersOnScreen = {};

    setContext('map', {
        getMap: () => map
    });

    $: map && map.getSource('data') && map.getSource('data').setData($geojson) && updateMarkers() && console.log('REACTIVE map setData (source updated) !');
    $: map /*&& $bounds.getNorthEast()*/ && map.fitBounds($bounds, {
        padding: {
            bottom: 100,
            top: 100,
            left: 350,
            right: 80
        }
    }) && console.log('REACTIVE map fitBounds !');
    $: map && $mapPosition && map.flyTo({
        center: $mapPosition,
        zoom: 18,
        padding: {left: 390}
    }) && updateMarkers() && console.log('REACTIVE map flyTo'); // TODO : global variable for left nav

    var layers = [];

    onMount(async () => {
        await geojson.updateWhereQuery();
        bounds.init_or_reset($geojson);

        map = new mapbox.Map({
            container,
            style: config.mapbox.style,
            center: config.mapbox.init.center,
            zoom: config.mapbox.init.zoom
        });

        map.on('load', () => {
            /* Data */
            map.addSource('data', {
                type: 'geojson',
                data: $geojson,
                cluster: true,
                //clusterId: 'clusters',
                clusterMaxZoom: 22, // Max zoom to cluster points on
                clusterRadius: 25, // Radius of each cluster when clustering points (defaults to 50)
                clusterProperties: createClusterProperties()
            });

            // after the GeoJSON data is loaded, update markers on the screen and do so on every map move/moveend
            map.on('data', function (e) {
                if (e.sourceId !== 'data' || !e.isSourceLoaded) return;
                console.log("reload data !");

                map.on('move', updateMarkers);
                map.on('moveend', updateMarkers);
                updateMarkers();
            });

            /* Symbols */
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
                map.loadImage('static/img/' + symbol + '.png', (error, image) => {
                    if (error) throw error;
                    map.addImage(symbol, image);
                    map.addLayer({
                        'id': layerID,
                        'type': 'symbol',
                        'cluster': false,
                        'source': 'data',
                        'layout': {
                            'icon-image': symbol,
                            'icon-size': 0.45,
                            'icon-allow-overlap': true,
                            'text-allow-overlap': true,
                            "text-field": "{name}",
                            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                            "text-size": 11,
                            "text-offset": [0, 1.2],
                            "text-anchor": "top"
                        },
                        'filter': ['==', 'type', symbol]
                    });
                    layers.push(layerID);
                });
            });
        });

        map.on('click', function (e) {
            console.log('click in the map !!');
            console.log(map.queryRenderedFeatures(e.point));

            var items = map.queryRenderedFeatures(e.point, {
                layers: layers
            });
            if (items.length == 1) {
                listPosition.scrollTo(items[0].properties.feature_id);
            }
            if (items.length > 1) {
                var coordinates = e.lngLat;
                var el = document.createElement('div');
                items.forEach((item) => {
                    var div = document.createElement('div');
                    div.classList.add('is-flex', 'is-align-items-center', 'poi');

                    var img = document.createElement('img');
                    img.src = 'static/img/' + config.pictos[item.properties.type_de_commerce].name + '.png';
                    div.appendChild(img);

                    var label = document.createElement('p');
                    label.innerText = item.properties.name;
                    div.appendChild(label);

                    div.addEventListener('click', (e) => {
                        var event_local_feature_id = item.properties.feature_id;
                        listPosition.scrollTo(event_local_feature_id);
                    });

                    el.appendChild(div);
                });

                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                new mapbox.Popup()
                        .setLngLat(items[0].geometry.coordinates)
                        .setDOMContent(el)
                        .addTo(map);
            }
        });

        map.on('mousemove', function (e) {
            var items = map.queryRenderedFeatures(e.point, {
                layers: layers
            });
            if (items.length > 0) {
                map.getCanvas().style.cursor = 'pointer';
            } else {
                map.getCanvas().style.cursor = 'default';
            }
        });
    });

    function updateMarkers() {
        var newMarkers = {};
        var features = map.querySourceFeatures('data');
        // for every cluster on the screen, create an HTML marker for it (if we didn't yet),
        // and add it to the map if it's not there already
        for (var i = 0; i < features.length; i++) {
            var coords = features[i].geometry.coordinates;
            var props = features[i].properties;
            if (!props.cluster) continue;
            var id = props.cluster_id;
            var count = props.point_count;
            var source = map.getSource('data');
            source.getClusterLeaves(id, count, 0, function (error, features) {
                //console.log('Cluster leaves:', error, features);
            });

            var marker = markers[id];
            if (!marker) {
                var el = createDonutChart(props);
                el['dataset']['cluster_id'] = id;
                el['dataset']['cluster_count'] = count;
                el['dataset']['cluster_lnglat'] = coords;
                marker = markers[id] = new mapbox.Marker({
                    element: el
                }).setLngLat(coords);
                marker.getElement().addEventListener('click', (e) => {
                    var eldataset = e.target['dataset'];
                    var elcoords = eldataset['cluster_lnglat'].split(',');
                    map.easeTo({
                        center: {lon: elcoords[0], lat: elcoords[1]},
                        zoom: map.getZoom() + 2
                    })
                });
            }
            newMarkers[id] = marker;

            if (!markersOnScreen[id]) marker.addTo(map);
        }
        // for every marker we've added previously, remove those that are no longer visible
        for (id in markersOnScreen) {
            if (!newMarkers[id]) markersOnScreen[id].remove();
        }
        markersOnScreen = newMarkers;
    }

</script>

<div id="this-is-not-a-map" bind:this={container}>
    {#if map}
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
        height: 100vh;
        width: 100vw;
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

    .mapboxgl-popup {
        .poi {
            * {
                pointer-events: none; // let pointer click events on .poi and not the rest
            }

            img {
                height: 26px;
                width: 26px;
            }

            padding: $spacing-100/2 $spacing-100;

            p {
                margin-left: $spacing-100 / 2;
                font-weight: 500;
                font-size: $size-4;
            }

            &:hover {
                background-color: $light-300;
                cursor: pointer;
            }
        }
    }

    .mapboxgl-popup-content {
        padding: 0 !important;
    }
</style>