<script>
    import {geojson} from '../utils/store2'
    import {listPosition, mapPosition} from '../utils/position'
    import {onMount} from "svelte";

    let list
    let value
    let open = false

    //$: $mapPosition && scroller.scrollIntoView({behavior: 'smooth'});
    $: $mapPosition && (open = false);
    $: $listPosition && (open = true);

    async function search() {
        await geojson.updateWhereQuery(value ? '"' + value + '"' : undefined);
    }

    onMount(() => {
        list.addEventListener('click', (e) => {
            if (e.target == list) {
                open = !open;
            }
        })

        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        window.addEventListener('resize', () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        });
    })

</script>

<div id="list" class:open={open} bind:this={list}>
    <div class="search-box">
        <h3 class="subtitle mb-2">
            Affiner la recherche
        </h3>
        <p class="control has-icons-right">
            <input id="test-input" type="text"
                   class="input"
                   placeholder="Type ou nom de magasin"
                   on:change={search} bind:value={value}/>
            <span class="icon is-small is-right">
              <img src="static/img/search.svg"/>
            </span>
        </p>
    </div>
    <ul id="markers">
        <slot></slot>
    </ul>
</div>


<style lang="scss">
    @import "../style/bulma-custom";
    @import "../../node_modules/bulma/sass/utilities/initial-variables";

    #list {
        position: relative;
        width: 100vw;
        height: 65vh;
        top: 100vh;
        top: calc(var(--vh, 1vh) * 100);
        z-index: 100;
        display: flex;
        flex-direction: column;
        background-color: $body-background-color;
        transition: ease 0.3s all;

        :global(&.open) {
            top: 35vh;
            top: calc(var(--vh, 1vh) * 35);
        }
    }

    @media screen and (min-width: $tablet) {
        #list {
            position: absolute;
            left: 30px;
            top: 30px;
            bottom: 30px;
            height: calc(100vh - 60px);
            width: 360px;
        }
    }

    @media screen and (max-width: $tablet) {
        :global(body) {
            overflow: hidden; // prevent scroll
        }

        #list {
            &:before {
                content: '';
                position: absolute;
                left: calc(50% - 70px / 2);
                top: -28px;
                border-radius: $radius $radius 0 0;
                border-top: 2px solid $light-400;
                background-color: white;
                height: 28px;
                width: 50px;
                margin: 3px 10px;
                background-repeat: no-repeat;
                background-position: center;
                background-size: cover;
                /* chevron-up, closed state */
                background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItY2hldnJvbi11cCI+PHBvbHlsaW5lIHBvaW50cz0iMTggMTUgMTIgOSA2IDE1Ij48L3BvbHlsaW5lPjwvc3ZnPg==);
            }

            /* chevron-down open state */
            :global(&.open:before) {
                background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItY2hldnJvbi1kb3duIj48cG9seWxpbmUgcG9pbnRzPSI2IDkgMTIgMTUgMTggOSI+PC9wb2x5bGluZT48L3N2Zz4=);
            }

        }
    }

    .search-box {
        margin: $spacing-100;
    }

    ul {
        position: relative;
        height: 100%;
        overflow: auto;
        list-style: none;
        margin: 0;
        padding: 0;
    }
</style>