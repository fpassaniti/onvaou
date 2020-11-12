<script>
    import {mapStore} from '../utils/mapStore';
    import {onMount} from 'svelte';
    import config from '../../app.config';

    export let record;
    let listitem;

    onMount(() => {
        listitem.addEventListener('mouseenter', () => {
            var marker = document.querySelector('.marker[data-recordid="' + record.recordid + '"]');
            marker.classList.add("mousehover");
        });
        listitem.addEventListener('mouseleave', () => {
            var marker = document.querySelector('.marker[data-recordid="' + record.recordid + '"]');
            marker.classList.remove("mousehover");
        });
    });

    function flyTo() {
        $mapStore.map.flyTo(
                {
                    center: [record.geolocalisation.lon, record.geolocalisation.lat],
                    zoom: 14,
                    padding: {
                        left: 390 // TODO : global variable for left nav
                    }
                }
        );
        /*$mapStore.map.easeTo({
            center: [record.geolocalisation.lon, record.geolocalisation.lat],
            zoom: 14,
            padding: {
                left: 390 // TODO : global variable for left nav
            }
        });*/
    }
</script>

<li class="listitem" data-recordid="{record.recordid}" bind:this={listitem}>
    <div class="card p-1">
        <div class="card-content p-3">
            <div class="media">
                <div class="media-left">
                    <figure class="image is-48x48">
                        <i class="{config.pictos[record.type_de_commerce].fontclass}"
                           style="color: {config.pictos[record.type_de_commerce].color}"/>
                    </figure>
                </div>
                <div class="media-content">
                    <p class="title is-4"> {record.nom_de_la_societe}</p>
                    <p class="subtitle is-4">{record.type_de_commerce}</p>
                </div>
            </div>

            <div class="content">
                <p>{record.fonctionnement_durant_le_confinement}
                    {#if record.horaires_modalites_d_acces_et_de_commande_durant_la_periode_de_confinement}
                    , {record.horaires_modalites_d_acces_et_de_commande_durant_la_periode_de_confinement}
                    {/if}
                </p>
                {#if record.geolocate_distance}
                    <p class="distance">
                        Distance : {record.geolocate_distance.toLocaleString(undefined, {maximumFractionDigits: 0})}
                    </p>
                {/if}
            </div>
        </div>
        <footer class="buttons has-addons is-right mb-1 mx-2">
            <button class="button is-rounded">Voir la fiche</button>
            <button class="button is-rounded" on:click={flyTo}>Voir sur la carte</button>
        </footer>
    </div>
</li>

<style lang="scss">
    @import "../style/bulma-custom";

    .card {
        transition: background-color 0.7s ease;

        figure.is-48x48 {
            font-size: 40px;
        }

        &:hover {
            background-color: $light-300;
        }
    }

    :global(li.highlighted .card) {
        background-color: $light-400;
    }
</style>