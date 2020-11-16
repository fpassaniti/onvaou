import {getBaseUrl, getRecordsUrl, addSelectQuery, addRowsQuery} from './odsql.js';
import {writable} from 'svelte/store';
import {addWhereQuery} from "./odsql";
import config from '../../app.config'

function createStore() {
    const {subscribe, set, update} = writable({});

    const fetchData = async (whereQuery = '') => {
        var url = getBaseUrl('data')('commerces-alimentaires-locaux-covid-19@cudunkerque');
        url = getRecordsUrl(url);
        url = addSelectQuery(url)('*');
        url = addWhereQuery(url)(whereQuery);
        url = addRowsQuery(url)(-1);

        const promiseFromServ = await fetch(url);
        const data = await promiseFromServ.json();
        const records = data.records.reduce((acc, record) => {
            const datum = {...record.record.fields};
            datum.recordid = record.record.id;
            return [...acc, datum];
        }, []);

        const geojson = {
            'type': 'FeatureCollection',
            'features': []
        };
        records.forEach((record) => {
            var point = {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [record.geolocalisation.lon, record.geolocalisation.lat]
                },
                'properties': {
                    'id': record.id,
                    'type': config.pictos[record.type_de_commerce].name,
                    'name': record.nom_de_la_societe,
                    'true': true
                }
            };
            geojson.features.push(point);
        });
        return geojson;
    };

    const methods = {
    };

    return {
        subscribe,
        async updateData(whereQuery) {
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