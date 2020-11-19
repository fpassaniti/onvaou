<div>
    <ul id="markers">
        <slot></slot>
    </ul>
</div>


<style lang="scss">
    div {
        position: absolute;
        z-index: 100;
        left: 30px;
        top: 30px;
        bottom: 30px;
        height: calc(100vh - 60px);
        width: 360px;
        overflow: auto;
        background-color: white;
        //background-color: $body-background-color;
    }

    ul {
        position: relative;
        list-style: none;
        margin: 0;
        padding: 0;
    }
</style>