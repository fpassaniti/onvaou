export default {
    mapbox: {
        apikey: "pk.eyJ1IjoiZnBhc3Nhbml0aSIsImEiOiIxNTg3MGRlZWQyNjVkZjExMGVlNWVjNDFjOWQyNzNiMiJ9.pYKDlO4v-SNiDz08G9ZZoQ",
        init: { /* default map location (center of the map, and zoom level) */
            zoom: 9,
            center: [2.378454, 48.866747]
        },
        style: "mapbox://styles/mapbox/streets-v11",
        geocoder: { /* Narrow search results to the defined boundingbox to avoid to many noises */
            searchbbox: [1.688735,48.634495,3.007094,49.076338],
            placeholder: "Chercher une adresse"
        },
    }
};

