<style lang="scss">
    div {
        position: absolute;
        z-index: 100;
        left: 30px;
        top: 30px;
        bottom: 30px;
        height: calc(100vh - 60px);
        width: 250px;
        overflow: auto;
        background-color: white;
    }
</style>



<div>
    <ul>
        <slot></slot>
    </ul>
</div>