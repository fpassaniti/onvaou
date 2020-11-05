<svelte:head>
    <link href='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css' rel='stylesheet'/>
</svelte:head>

<style>
    .map {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100vh;
        width: 100vw;
    }
</style>

<script>
    import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
    import {onMount} from 'svelte';
    import {records} from './utils/data.js'

    onMount(async () => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZnBhc3Nhbml0aSIsImEiOiIxNTg3MGRlZWQyNjVkZjExMGVlNWVjNDFjOWQyNzNiMiJ9.pYKDlO4v-SNiDz08G9ZZoQ';
        let bounds = new mapboxgl.LngLatBounds();
        var map = new mapboxgl.Map({
            container: 'this-is-not-a-map',
            style: 'mapbox://styles/mapbox/streets-v11'
        });
        map.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        }));
        await records.update();
        $records.forEach(record => {
            new mapboxgl.Marker()
                    .setLngLat([record.geolocalisation.lon, record.geolocalisation.lat])
                    .setPopup(new mapboxgl.Popup().setHTML(`
                    <h1>${record.nom_de_la_societe}</h1>
                    <ul>
                        <li>
                            Type: ${record.type_de_commerce}
                        </li>
                        <li>
                            Adresse: ${record.adresse_du_point_de_vente}
                        </li>
                    </ul>
                    `))
                    .addTo(map);
            bounds.extend([record.geolocalisation.lon, record.geolocalisation.lat]);
        });
        map.fitBounds(bounds, { padding: { bottom: 150, top: 50, left: 20, right: 20 } });
    });
</script>

<ul>
    {#each $records as record}
        <li>
            {record.adresse_du_point_de_vente}
        </li>
    {/each}
</ul>

<div class="map" id="this-is-not-a-map">
    I guess
</div>