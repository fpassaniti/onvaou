<script>
    import {onMount} from 'svelte';
    import config from '../../app.config';
    import {position} from '../utils/position'

    export let feature;

    let listitem;

    onMount(() => {
        /*listitem.addEventListener('mouseenter', () => {
            var marker = document.querySelector('.marker[data-featureid="' + feature.properties.featureid + '"]');
            marker.classList.add("mousehover");
        });
        listitem.addEventListener('mouseleave', () => {
            var marker = document.querySelector('.marker[data-featureid="' + feature.properties.featureid + '"]');
            marker.classList.remove("mousehover");
        });*/
    });

    function flyTo() {
        position.flyTo([feature.geometry.coordinates[0], feature.geometry.coordinates[1]]);
    }
</script>

<li class="listitem" data-featureid="{feature.properties.name}" bind:this={listitem}>
    <div class="card p-1">
        <div class="card-content p-3">
            <div class="media">
                <div class="media-left">
                    <figure class="image is-48x48">
                        {#if config.pictos[feature.properties.type_de_commerce]}
                        <i class="{config.pictos[feature.properties.type_de_commerce].fontclass}"
                           style="color: {config.pictos[feature.properties.type_de_commerce].color}"/>
                        {/if}
                        {#if !config.pictos[feature.properties.type_de_commerce]}
                        <i class="{config.pictos['default'].fontclass}"
                           style="color: {config.pictos['default'].color}"/>
                        {/if}
                    </figure>
                </div>
                <div class="media-content">
                    <p class="title is-4"> {feature.properties.nom_de_la_societe}</p>
                    <p class="subtitle is-4">{feature.properties.type_de_commerce}</p>
                </div>
            </div>

            <div class="content">
                <p>{feature.properties.fonctionnement_durant_le_confinement}
                    {#if feature.properties.horaires_modalites_d_acces_et_de_commande_durant_la_periode_de_confinement}
                    , {feature.properties.horaires_modalites_d_acces_et_de_commande_durant_la_periode_de_confinement}
                    {/if}
                </p>
                {#if feature.properties.geolocate_distance}
                    <p class="distance">
                        Distance : {feature.properties.geolocate_distance.toLocaleString(undefined, {maximumFractionDigits: 0})}
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