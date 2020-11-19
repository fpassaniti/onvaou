import {writable} from 'svelte/store';
import {getBaseUrl, getRecordsUrl, getGeoJsonExportUrl, addSelectQuery, addRowsQuery} from './odsql.js';

import config from '../../app.config'

export const geojsonUrl = writable(undefined);
export const flyToOptions = writable(undefined);
export const records = writable([]);
export const geojson = writable({
    'type': 'FeatureCollection',
    'features': []
});

export const initGeojsonURL = () => {
    var url = getBaseUrl('data')('commerces-alimentaires-locaux-covid-19@cudunkerque');
    url = getRecordsUrl(url);
    url = addSelectQuery(url)('*');
    url = addRowsQuery(url)(-1);
    geojsonUrl.set(url);
};

export const fetchData = () => {
    geojsonUrl.subscribe((url) => {
        fetch(url).then((response) => {
            const data = response.json();
            const results = data.features.reduce((acc, record) => {
                const datum = {...record.properties.fields};
                datum.recordid = record.record.id;
                return [...acc, datum];
            }, []);
            records.set(results)
        });
    });
};

export const updateGeojson = () => {
    records.update((records) => {
        geojson.features = [];
        records.forEach((record) => {
            var point = {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [record.geolocalisation.lon, record.geolocalisation.lat]
                },
                'properties': {
                    'id': String(new Date().getTime()),
                    'type': record.type_de_commerce
                }
            };
            geojson.features.push()
        });
    });
};

export const setFlyTo = (opt) => {
    flyToOptions.set(opt);
};
