<script>
    import config from '../../app.config';
    import {mapPosition, listPosition} from '../utils/position'

    export let feature;

    let listitem;

    function flyTo() {
        mapPosition.flyTo({lng: feature.geometry.coordinates[0], lat: feature.geometry.coordinates[1]});
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
    && (listitem.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'center'})
            || listPosition.reset() // in case you click a second time in a row on the same point
            || highlightForAWhile()
            || console.log("Scroll ! ", listitem)
    );

    /* sligntly modified from https://stackoverflow.com/questions/2685911/is-there-a-way-to-round-numbers-into-a-reader-friendly-format-e-g-1-1k */
    function abbrNum(number, decPlaces) {
        decPlaces = Math.pow(10,decPlaces);
        var abbrev = [ " mètres", " km" ];
        for (var i=abbrev.length-1; i>=0; i--) {
            var size = Math.pow(10,(i)*3);
            if(size <= number) {
                number = Math.round(number*decPlaces/size)/decPlaces;
                if((number == 1000) && (i < abbrev.length - 1)) {
                    number = 1;
                    i++;
                }
                number += abbrev[i];
                break;
            }
        }
        return number;
    }
</script>

<li class="listitem" data-featureid="{feature.properties.feature_id}" bind:this={listitem}>
    <div class="card is-radiusless p-2"
         style="border-left: 6px solid {(config.pictos[feature.properties.type_de_commerce] || config.pictos['default']).color}">
        <div class="card-content p-0">
            <div class="media">
                <div class="media-left">
                    <figure class="image is-32x32">
                        <img alt="poi type icon" src="{'static/img/' + (config.pictos[feature.properties.type_de_commerce] || config.pictos['default']).name + '.png'}"/>
                    </figure>
                </div>
                <div class="media-content">
                    <p class="title is-5"> {feature.properties.nom_de_la_societe}</p>
                    <p class="subtitle is-5">{feature.properties.type_de_commerce}</p>
                </div>
            </div>
        </div>
        <footer class="level mt-2">
            <div class="level-left">
                {#if feature.properties.geolocate_distance}
                    <p class="is-size-5 has-text-danger is-clipped">
                        <!--A {feature.properties.geolocate_distance.toLocaleString(undefined, {maximumFractionDigits: 0})} mètres-->
                        A { abbrNum(feature.properties.geolocate_distance,1) }
                    </p>
                {/if}
            </div>
            <div class="level-right">
                    <div class="buttons has-addons is-right">
                        <button class="button is-size-6 is-rounded" on:click={openModal}>Voir la fiche</button>
                        <button class="button is-size-6 is-rounded" on:click={flyTo}>Voir sur la carte</button>
                    </div>
            </div>
        </footer>
    </div>

    <div class="modal">
        <div class="modal-background" on:click={closeModal}></div>
        <div class="modal-card">
            <div class="modal-card-body">
                <div class="media">
                    <div class="media-left">
                        <figure class="image is-48x48">
                            <img alt="poi type icon" src="{'static/img/' + (config.pictos[feature.properties.type_de_commerce] || config.pictos['default']).name + '.png'}"/>
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
                            <a href="tel:{feature.properties.contact_telephonique}">
                                {feature.properties.contact_telephonique}
                            </a>
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