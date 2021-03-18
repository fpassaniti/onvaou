<script>
    import {circles} from '../utils/circles';
    import {onMount} from "svelte";

    export let open = false;
    let closebtn;
    let nav;

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
    const setEditableAndFocus = (e) => {
        e.target.contentEditable = true;
        e.target.focus();
        document.execCommand('selectAll', false, null)
    }

    onMount(() => {
        closebtn.addEventListener('click', (e) => {
            open = false;
        });
    });

    const updateNameProperty = (e) => {
        e.target.contentEditable = false;
        circles.updateCircleName(e.target.dataset['fillid'], e.target.innerText)
    }
</script>
<div class="nav-container open"
     class:open={open}
     bind:this={nav}>
    <div class="nav-header">
        <h1 class="subtitle is-size-2 py-4 px-5 has-text-weight-light">
            Vos cercles
        </h1>
        <i class="delete is-large" bind:this={closebtn}></i>
    </div>
    <div class="nav-content px-5">
        <!--<h1 class="title has-text-centered">On va où</h1>
        <p class="has-text-centered">L'app qui vous aide à visualiser le rayon de 10km autour de votre dimicile.</p>-->

        {#each Object.values($circles) as circle}
            <div class="contenteditable-container  mb-2">
                &#8203;<p data-fillid="{circle.properties['fillId']}"
                          tabindex="1"
                          class="input"
                          on:click={setEditableAndFocus}
                          on:blur={updateNameProperty}
                          on:keypress={pressed}>
                {circle.properties['name']}
                <i class="edit"/>
            </p>&#8203;
            </div>
        {/each}
        {#if Object.keys($circles).length == 0}
            <p>Cliquez sur la carte pour faire apparaître un premier rayon de 10 km.</p>
        {/if}
    </div>
    <div class="nav-footer p-3 is-italic">
        <p class="has-text-justified">Onvaou.app vous aide à mieux visualiser le cercle de confinement de 10km, et programmer des
            balades et sorties vélos avec vos amis.</p>
        <p class="has-text-weight-bold">Application gratuite,
            <a href="https://github.com/fpassaniti/onvaou/" target="_blank">
                open source</a>, développée par <a href="https://twitter.com/FpassX" target="_blank">
                Frédéric Passaniti
            </a>
        </p>
    </div>
</div>

<style lang="scss">
    @import "../style/bulma-custom";
    @import "../../node_modules/bulma/sass/utilities/initial-variables";

    .nav-container {
        height: 100%;
        width: 320px;
        position: absolute;
        top: 0;
        left: -320px;
        background-color: white;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, .1);
        z-index: 6;
        transition: .3s ease left;

        &.open {
            left: 0px;
        }

        > * {
            width: 100%;
            position: absolute;
            left: 0;
        }

        .nav-header {
            height: 80px;
            top: 0;

            i.delete {
                position: absolute;
                right: 15px;
                top: 15px;
            }
        }

        .nav-content {
            margin-top: 80px;
            margin-bottom: 150px;
            top: 0;
            bottom: 0;
            width: 100%;
            overflow: auto;

            .contenteditable-container {
                cursor: text;

                > *:not(:focus):after {
                    content: "\f044";
                    font-family: "Font Awesome 5 Free";
                    right: 6px;
                    font-size: 1.2em;
                    color: $ods-text;
                    position: absolute;
                    pointer-events: none;
                }
            }
        }

        .nav-footer {
            height: 150px;
            bottom: 0;
            border-top: 1px solid #eee;
        }
    }

</style>
