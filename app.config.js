export default {
    data: {
        datasetid: "commerces-alimentaires-locaux-covid-19",
        domainid: "fpassaniti"
    },
    mapbox: {
        apikey: "pk.eyJ1IjoiZnBhc3Nhbml0aSIsImEiOiIxNTg3MGRlZWQyNjVkZjExMGVlNWVjNDFjOWQyNzNiMiJ9.pYKDlO4v-SNiDz08G9ZZoQ",
        init: { /* default map location (center of the map, and zoom level) */
            zoom: 8,
            center: [2.374126, 51.023950]
        },
        style: "mapbox://styles/mapbox/light-v10",
        geocoder: { /* Narrow search results to the defined boundingbox to avoid to many noises */
            searchbbox: [2.108065, 50.896051, 2.608629, 51.132778]
        },
    },
    store: {
        unique_ids: ['nom_de_la_societe', 'adresse_du_point_de_vente']
    },
    pictos: {
        "default": // mandatory, keep a default icon
            {
                "name": "default",
                "url":
                    "static/img/pin.svg",
                "fontclass":
                    "",
                "color":
                    "#f5f5f5"
            },
        "Traiteur - restauration à emporter":
            {
                "name": "traiteur",
                "url":
                    "static/img/traiteur.svg",
                "fontclass":
                    "icon-traiteur",
                "color":
                    "#FDD98B"
            }
        ,
        "Primeur - fruits et légumes":
            {
                "name": "primeur",
                "url":
                    "static/img/primeur.svg",
                "fontclass":
                    "icon-primeur",
                "color":
                    "#1EA81A"
            }
        ,
        "Poissonnerie":
            {
                "name": "poissonnerie",
                "url":
                    "static/img/poissonnerie.svg",
                "fontclass":
                    "icon-poissonnerie",
                "color":
                    "#86B1FC"
            }
        ,
        "Livraisons":
            {
                "name": "truck",
                "url":
                    "static/img/truck.svg",
                "fontclass":
                    "icon-truck",
                "color":
                    "#364852"
            }
        ,
        "Boucherie - charcuterie":
            {
                "name": "boucherie_charcuterie",
                "url":
                    "static/img/boucherie_charcuterie.svg",
                "fontclass":
                    "icon-boucherie_charcuterie",
                "color":
                    "#CB3019"
            }
        ,
        "Crèmerie - fromagerie":
            {
                "name": "fromagerie",
                "url":
                    "static/img/fromagerie.svg",
                "fontclass":
                    "icon-fromagerie",
                "color":
                    "#FDDB00"
            }
        ,
        "Vins - bières - spiritueux":
            {
                "name": "vin",
                "url":
                    "static/img/vin.svg",
                "fontclass":
                    "icon-vin",
                "color":
                    "#F90126"
            }
        ,
        "Boulangerie - pâtisserie":
            {
                "name": "boulangerie_patisserie",
                "url":
                    "static/img/boulangerie_patisserie.svg",
                "fontclass":
                    "icon-boulangerie_patisserie",
                "color":
                    "#E2A76F"
            }
        ,
        "Drive":
            {
                "name": "truck",
                "url":
                    "static/img/truck.svg",
                "fontclass":
                    "icon-truck",
                "color":
                    "#364852"
            }
        ,
        "Épicerie":
            {
                "name": "epicerie",
                "url":
                    "static/img/epicerie.svg",
                "fontclass":
                    "icon-epicerie",
                "color":
                    "#FDD98B"
            }
        ,
        "Alimentation générale":
            {
                "name": "alimentation_generale",
                "url":
                    "static/img/alimentation_generale.svg",
                "fontclass":
                    "icon-alimentation_generale",
                "color":
                    "#E06000"
            }
        ,
        "Supermarché ou hypermarché":
            {
                "name": "supermarche",
                "url":
                    "static/img/supermarche.svg",
                "fontclass":
                    "icon-supermarche",
                "color":
                    "#364852"
            }
    }
};

