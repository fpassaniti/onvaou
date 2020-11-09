<script>
    import { getContext, onMount } from 'svelte'

    const { mapbox, getMap, bounds } = getContext('mapbox');
    const map = getMap();

    export let record;

    let { lat, lon } = record.geolocalisation;
    const marker = new mapbox.Marker()
            .setLngLat([lon, lat])
            .setPopup(new mapbox.Popup().setHTML(`
                <h1>${record.nom_de_la_societe}</h1>
                <ul>
                    <li>
                        Type: ${record.type_de_commerce}
                    </li>
                    <li>
                        Adresse: ${record.adresse_du_point_de_vente}
                    </li>
                </ul>
                `));
    bounds.extend([lon, lat]);
    map.fitBounds(bounds, { padding: { bottom: 150, top: 50, left: 300, right: 20 } })

    onMount(() => {
        /*console.log(map);
        console.log(marker);*/
        marker.addTo(map);
        //return () => marker.remove();
    });
</script>