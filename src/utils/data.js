import {getRecordsUrl, addSelectQuery, addRowsQuery} from './odsql.js';
import {writable} from 'svelte/store';


function createRecords() {
    const {subscribe, set, update} = writable([]);

    const fetchData = async () => {
        var url = getRecordsUrl('data')('commerces-alimentaires-locaux-covid-19@cudunkerque');
        url = addSelectQuery(url)('*');
        url = addRowsQuery(url)(100);

        const promiseFromServ = await fetch(url);
        const data = await promiseFromServ.json();
        const records = data.records.reduce((acc, record) => {
            const datum = {...record.record.fields};
            datum.recordid = record.record.id;
            return [...acc, datum];
        }, []);
        return records;
    };

    const methods = {
        async sortData(lat, lng) {
            update(records => {
                records.forEach(record => {
                    Object.defineProperty(record, 'geolocate_distance', {
                        value: turf.distance(
                            [record.geolocalisation.lat, record.geolocalisation.lon],
                            [lat, lng],
                            {units:'meters'}),
                        writable: true,
                        enumerable: true,
                        configurable: true
                    });
                });
                records.sort((a,b) => {
                    if (a.geolocate_distance >= b.geolocate_distance)
                        return 1;
                    else
                        return -1;
                })
                return records;
            });
        }
    };

    return {
        subscribe,
        async update() {
            set(await fetchData())
        },
        reset: () => {
            set([])
        },
        ...methods
    };
}

export const records = createRecords();
