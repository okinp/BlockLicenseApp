<template>
<div class="closeBar">
    <a id="cross" href="#" v-on:click="emitClose"><i class="material-icons icon-gray">clear</i></a>
</div>
</template>
<script>
export default {
    name: "close-bar",
    methods: {
        emitClose: function(){
            this.$emit("close", true);
        }
    }
}
</script>
<style lang="scss" scoped>
.closeBar {
    width: 100%;
    height: 31px;
    box-sizing: border-box;
    padding: 8px 8px;
    display: flex;
    justify-content: flex-end;
    > a {
        display: inline-block;
        height: 15px;
        width: 15px;
        line-height:15px;
        i.icon-gray {
            color: #BFC6D0;
            font-size: 15px;
        }
    }
}
</style>