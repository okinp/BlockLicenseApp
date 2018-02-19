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
            console.log("close pressed");
        }
    }
}
</script>
<style scoped>
    .closeBar {
        width: 100%;
        height: 15px;
        margin-bottom: 0;
    }
    .closeBar > a {
        float: right;
        margin-top: 5px;
        margin-right: 8px;
    }
    i.icon-gray {
        color: #BFC6D0;
        font-size: 15px;
    }
</style>