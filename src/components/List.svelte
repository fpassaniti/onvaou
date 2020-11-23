<script>
    import {geojson} from '../utils/store2'

    let value

    async function search() {
        await geojson.updateWhereQuery(value?'"' + value + '"':undefined);
    }
</script>

<div id="list">
    <div class="search-box">
        <h3 class="subtitle mb-2">
            Affiner la recherche
        </h3>
        <p class="control has-icons-right">
            <input id="test-input" type="text"
                   class="input"
                   placeholder="Type ou non de magasin"
                   on:change={search} bind:value={value}/>
            <span class="icon is-small is-right">
              <img src="static/img/search.svg" />
            </span>
        </p>
    </div>
    <ul id="markers">
        <slot></slot>
    </ul>
</div>


<style lang="scss">
    @import "../style/bulma-custom";

    #list {
        position: absolute;
        z-index: 100;
        left: 30px;
        top: 30px;
        bottom: 30px;
        height: calc(100vh - 60px);
        width: 360px;
        display: flex;
        flex-direction: column;
        background-color: $body-background-color;
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