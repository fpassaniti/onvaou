<script>
    import {circles} from '../utils/circles'
    import {updateURI, utf8_to_b64} from '../utils/utils'

    /*const latlongname = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?),.*$/;

    const deserialize = (uri) => {
        var params = uri.split('|');
        params.forEach((param) => {
            console.log(latlongname.match(param));
            console.log(latlongname.exec(param));
        })
        encodeURIComponent("Frèd'holy")
    };*/

    const serialize = (data) => {
        var tmp = '';
        data.forEach((circle) => {
            const lng = circle.properties['center'][0];
            const lat = circle.properties['center'][1];
            const radius = circle.properties['radius'];
            const name = utf8_to_b64(circle.properties['name'])
            tmp += `${lng},${lat},${radius},${name}|`
        });
        if (tmp.length > 0) {
            return `/?config=${utf8_to_b64(tmp)}`
        } else {
            return '/'
        }
    };

    $: updateURI(serialize(Object.values($circles)));
</script>