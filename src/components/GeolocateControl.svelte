<svelte:head>
    <script src="https://npmcdn.com/@turf/turf/turf.min.js"></script>
</svelte:head>

<script>
    import { mapStore } from '../utils/mapStore';
    import { records } from '../utils/data';
    import { scrollToTop } from '../utils/helpers'

    export let position = 'top-right';
    export let options = {
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    };

    var geolocate = new $mapStore.mapboxgl.GeolocateControl(options);
    geolocate.on('geolocate', async (e) => {
        console.log('Geolocate to : ' + e.coords.latitude + ', ' + e.coords.longitude);
        await records.sortData(e.coords.latitude, e.coords.longitude);
        scrollToTop();
    });
    $mapStore.map.addControl(geolocate, position);


    /*
    * events = [
	  'error',
	  'geolocate',
	  'outofmaxbounds',
	  'trackuserlocationend',
	  'trackuserlocationstart'
	]
    * */
</script>

