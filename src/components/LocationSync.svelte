<script>
    import {circles} from '../utils/circles'
    import {updateURI, utf8_to_b64} from '../utils/utils'

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