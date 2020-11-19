import config from '../../app.config'

/* from https://gist.github.com/codeguy/6684588 */
export function slugify(str, separator = "-") {
    return str
        .toString()
        .normalize('NFD')                   // split an accented letter in the base letter and the acent
        .replace(/[\u0300-\u036f]/g, '')   // remove all previously split accents
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, '')   // remove all chars not letters, numbers and spaces (to be replaced)
        .replace(/\s+/g, separator);
}

export function createFeatureUniqueIDFromConfigAndProperties(props) {
    var acc = [];
    config.store.unique_ids.forEach((id) => {
        var val = props[id];
        if (val) {
            acc.push(val);
        }
    });
    return slugify(acc.join('-'));
}
