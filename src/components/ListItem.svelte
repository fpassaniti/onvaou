<script>
    import config from '../../app.config';
    import {mapPosition, listPosition} from '../utils/position'

    export let feature;

    let listitem;

    function flyTo() {
        mapPosition.flyTo({lng:feature.geometry.coordinates[0], lat:feature.geometry.coordinates[1]});
    }

    function openModal() {
        listitem.querySelector('.modal').classList.add('is-active');
    }

    function closeModal() {
        listitem.querySelector('.modal').classList.remove('is-active');
    }

    function highlightForAWhile() {
        listitem.classList.add('highlighted');
        var to = setTimeout(() => {
            listitem.classList.remove('highlighted');
            clearTimeout(to);
        }, 1500);
        return true;
    }

    $: $listPosition
    && $listPosition == feature.properties.feature_id
    && (listitem.scrollIntoView({behavior: 'smooth'})
            || listPosition.reset() // in case you click a second time in a row on the same point
            || highlightForAWhile()
            || console.log("Scroll ! ", listitem)
    );
</script>

<li class="listitem" data-featureid="{feature.properties.feature_id}" bind:this={listitem}>
    <div class="card p-1">
        <div class="card-content p-3">
            <div class="media">
                <div class="media-left">
                    <figure class="image is-48x48">
                        <img src="{'/static/img/' + (config.pictos[feature.properties.type_de_commerce] || config.pictos["default"]).name + '.png'}" />
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
                        Distance
                        : {feature.properties.geolocate_distance.toLocaleString(undefined, {maximumFractionDigits: 0})}
                    </p>
                {/if}
            </div>
        </div>
        <footer class="buttons has-addons is-right mb-1 mx-2">
            <button class="button is-rounded" on:click={openModal}>Voir la fiche</button>
            <button class="button is-rounded" on:click={flyTo}>Voir sur la carte</button>
        </footer>
    </div>

    <div class="modal">
        <div class="modal-background" on:click={closeModal}></div>
        <div class="modal-card">
            <div class="modal-card-body">
                <div class="media">
                    <div class="media-left">
                        <figure class="image is-48x48">
                            <img src="{'/static/img/' + (config.pictos[feature.properties.type_de_commerce] || config.pictos["default"]).name + '.png'}" />
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-4"> {feature.properties.nom_de_la_societe}</p>
                        <p class="subtitle is-4">{feature.properties.type_de_commerce}</p>
                    </div>
                </div>
                <div class="content mt-3">
                    <dl>
                        <dt>Fonctionnement durant le confinement</dt>
                        <dd>
                            {feature.properties.fonctionnement_durant_le_confinement}
                            {#if feature.properties.horaires_modalites_d_acces_et_de_commande_durant_la_periode_de_confinement}
                                ,{feature.properties.horaires_modalites_d_acces_et_de_commande_durant_la_periode_de_confinement}
                            {/if}
                        </dd>
                        <dt>Contact téléphonique</dt>
                        <dd>
                            {feature.properties.contact_telephonique}
                        </dd>
                        <dt>Livraisons</dt>
                        <dd>
                            {#if feature.properties.ilivraison}
                                Oui
                            {/if}
                            {#if !feature.properties.ilivraison}
                                Non renseigné
                            {/if}
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
        <button class="modal-close is-large" aria-label="close" on:click={closeModal}></button>
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

    :global(.highlighted .card) {
        background-color: $light-400;
    }

    :global(.modal-card) {
        z-index: 101;
    }
    :global(.modal-background) {
        z-index: 100;
    }
</style>