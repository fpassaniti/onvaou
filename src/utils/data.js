import {getRecordsUrl, addSelectQuery, addRowsQuery} from './odsql.js';
import {writable} from 'svelte/store';

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

function createRecords() {
    const {subscribe, set, update} = writable([]);

    return {
        subscribe,
        async update() {
            set(await fetchData())
        },
        reset: () => {
            set([])
        }
    };
}

export const records = createRecords();
