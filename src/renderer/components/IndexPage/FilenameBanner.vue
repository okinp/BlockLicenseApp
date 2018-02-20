<template>
<div class="banner">
    <div class="label">
        <p>Filename:</p>
    </div>
    <div class="filename">
        <p>{{name}}</p>
    </div>
</div>
</template>
<script>
export default {
    name: 'filename-banner',
    props: ['fileName'],
    data: function(){
        return {
            name: this.fileName.split('/').slice(-1)[0]
        }
    }
}
</script>
<style lang="scss" scoped>
    .banner {
        width: 100%;
        height: 40px;
        padding: 10px 24px;
        background: linear-gradient(to right, #301F66 , #316ECF);
        color: #fff;
        font-size: 14px;
        display: flex;
        box-sizing: border-box;
        .label {
            color: rgba(255,255,255,0.5);
            width: 20%;
            display: flex; 
        }
        .filename {
            width: 80%;
            box-sizing: border-box;
            display: flex;
        }
        p {
            margin: 0;
            line-height: 20px;
            box-sizing: border-box;
        }
    }
</style>