<script>
    import {circles} from '../utils/circles';
    import {onMount} from "svelte";

    let open = true;
    let list;

    const pressed = (e) => {
        if (e.charCode === 13) {
            e.preventDefault;
            e.target.blur();
        }
    };
    const focus = (e) => {
        var ft = setTimeout(() => {
            document.execCommand('selectAll', false, null)
            clearTimeout(ft);
        }, 150)
    };

    onMount(() => {
        list.addEventListener('click', (e) => {
            if (e.target == list) {
                open = !open;
            }
        });

        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        window.addEventListener('resize', () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        });
    })

    const updateNameProperty = (e) => {
        circles.updateCircleName(e.target.dataset['fillid'], e.target.innerText)
    }
</script>

<div id="list" class="px-3 py-2"
     class:open={open}
     bind:this={list}>
    <h1 class="title has-text-centered">On va où</h1>
    <p class="has-text-centered">L'app qui vous aide à visualiser le rayon de 20km autour de votre dimicile.</p>

    <h3 class="title is-size-4 mt-5">Liste des cercles:</h3>
    {#each Object.values($circles) as circle}
        <p data-fillid="{circle.properties['fillId']}"
           contenteditable="true"
           tabindex="1"
           class="editable input mb-2"
           on:focus={focus}
           on:blur={updateNameProperty}
           on:keypress={pressed}
           bind:textContent={circle.properties['name']}>
            {circle.properties['name']}
            <i class="edit"/>
        </p>
    {/each}
    {#if Object.keys($circles).length == 0}
        <p>Cliquez sur la carte pour dessiner votre première zone de 20 km!</p>
    {/if}
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
            width: 260px;
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

    .editable {
        &:not(:focus):after {
            content: "\f044";
            font-family: "Font Awesome 5 Free";
            right: 6px;
            font-size: 1.2em;
            color: $ods-text;
            position: absolute;
            pointer-events: none;
        }
    }
</style>