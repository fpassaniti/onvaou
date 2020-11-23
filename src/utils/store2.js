import {getBaseUrl, getRecordsUrl, addSelectQuery, addRowsQuery} from './odsql.js';
import {writable} from 'svelte/store';
import {addWhereQuery, getGeoJsonExportUrl} from "./odsql";
import config from '../../app.config'
import {createFeatureUniqueIDFromConfigAndProperties} from '../utils/storeHelpers'

function createStore() {
    const {subscribe, set, update} = writable({});

    const fetchData = async (whereQuery = '') => {
        var url = getBaseUrl(config.data.domainid)(config.data.datasetid);
        url = getGeoJsonExportUrl(url);
        url = addWhereQuery(url)(whereQuery);
        url = addRowsQuery(url)(-1);

        const promiseFromServ = await fetch(url);
        const geojson = await promiseFromServ.json();

        geojson.features.forEach((feature) => {
            var type;
            if (config.pictos[feature.properties.type_de_commerce]) {
                type = config.pictos[feature.properties.type_de_commerce].name;
            } else {
                type = config.pictos["default"].name;
                console.warn(feature.properties.type_de_commerce + ' type doesn\'t exists in app config.');
            }
            feature.properties.type = type;
            feature.properties.name = feature.properties.nom_de_la_societe;
            feature.properties.feature_id = createFeatureUniqueIDFromConfigAndProperties(feature.properties);
        });
        return geojson;
    };

    const methods = {};

    return {
        subscribe,
        async updateWhereQuery(whereQuery) {
            console.log('Call store updateData(' + whereQuery + ')');
            set(await fetchData(whereQuery))
        },
        reset: () => {
            set([])
        },
        ...methods
    };
}

export const geojson = createStore();


/* SEARCH RECORDS API Version */

/*const processAPIQuery = async (url) => {
        const promiseFromServ = await fetch(url);
        const data = await promiseFromServ.json();
        const records = data.records.reduce((acc, record) => {
            const datum = {...record.record.fields};
            datum.recordid = record.record.id;
            return [...acc, datum];
        }, []);

        if (data.links[data.links.length - 1]['rel'] == 'next') {
            return [...await processAPIQuery(data.links[data.links.length - 1]['href']), ...records];
        } else {
            return records;
        }
    };*/

/*const fetchData = async (whereQuery = '') => {
    var url = getBaseUrl('data')('commerces-alimentaires-locaux-covid-19@cudunkerque');
    url = getRecordsUrl(url);
    url = addSelectQuery(url)('*');
    url = addWhereQuery(url)(whereQuery);
    url = addRowsQuery(url)(100);

    const records = await processAPIQuery(url);

    const geojson = {
        'type': 'FeatureCollection',
        'features': []
    };
    records.forEach((record) => {
        var type;
        if (config.pictos[record.type_de_commerce]) {
            type = config.pictos[record.type_de_commerce].name;
        } else {
            type = config.pictos["default"].name;
            console.warn(record.type_de_commerce + ' type doesn\'t exists in app config.');
        }
        var point = {
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': [record.geolocalisation.lon, record.geolocalisation.lat]
            },
            'properties': {
                'id': record.id,
                'type': type,
                'name': record.nom_de_la_societe,
                'true': true
            }
        };
        geojson.features.push(point);
    });
    return geojson;
};*/