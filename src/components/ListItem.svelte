<script>
    import { mapStore } from '../utils/mapStore';
    import { onMount } from 'svelte';

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
                center:[record.geolocalisation.lon,record.geolocalisation.lat],
                zoom: 14
            }
        );
    }
</script>

<li class="listitem" data-recordid="{record.recordid}" bind:this={listitem}>
    <button class="button is-rounded it-outlined is-size-6 button-flyto" on:click={flyTo}>flyTo</button>
    <h3 class="has-text-black">
        {record.nom_de_la_societe}
    </h3>
    <dl>
        <dt>Type de commerce</dt>
        <dd>{record.type_de_commerce}</dd>
        <dt>État durant le confinement</dt>
        <dd>{record.fonctionnement_durant_le_confinement}</dd>
        <dt>Adresse</dt>
        <dd>{record.adresse_du_point_de_vente}</dd>
        <dt>Horaire (durant le confinement)</dt>
        <dd>{record.horaires_modalites_d_acces_et_de_commande_durant_la_periode_de_confinement}</dd>
    </dl>
    {#if record.geolocate_distance}
        <p class="distance">
            {record.geolocate_distance.toLocaleString(undefined, {maximumFractionDigits: 0})}
        </p>
    {/if}
</li>

<style lang="scss">
    li {
        position: relative;
        padding: 6px;
        border-left: 6px solid lightgreen;
        transition: 0.3s ease all;
    }
    :global(li.highlighted) {
        border-left: 6px solid red !important;
    }

    dt {
        color: #565656;
        font-size: 0.95em;
    }
    .button-flyto {
        position: absolute;
        top: 6px;
        right: 6px;
    }
</style>