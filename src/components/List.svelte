<script>
    import {geojson} from '../utils/store2'
    import {mapPosition} from '../utils/position'

    let value;
    let scroller;

    $: $mapPosition && scroller.scrollIntoView({behavior: 'smooth'});

    async function search() {
        await geojson.updateWhereQuery(value ? '"' + value + '"' : undefined);
    }
</script>

<div id="list">
    <div id="top-scroller" bind:this={scroller}></div>
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
        height: 80vh;
        top: 60vh;
        z-index: 100;
        display: flex;
        flex-direction: column;
        background-color: $body-background-color;
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
        #top-scroller {
            position: absolute;
            top: -60vh;
        }
        #list {
            &:before {
                content: '';
                position: absolute;
                left: calc(50% - 32px / 2);
                top: 3px;
                background-color: white;
                height: 13px;
                width: 28px;
                opacity: 0.8;
                background: url('/static/img/drag.png') no-repeat;
                background-position: center;
                background-size: cover;
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