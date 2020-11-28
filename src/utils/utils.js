export function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxx-xxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

export function createEmptyGeojson() {
    const empty = {
        "type": "Feature",
        "properties": {
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": []
        }
    };
    return empty;
}

export function updateURI(uri) {
    if (uri) {
        history.pushState({}, '', uri);
    }
}
export function utf8_to_b64( str ) {
    return window.btoa(unescape(encodeURIComponent( str )));
}
export function b64_to_utf8( str ) {
    return decodeURIComponent(escape(window.atob( str )));
}