<template>
<div class="banner">
    <v-container fluid>
            <v-layout row wrap>
                <v-flex xs4>
                    <p class="filename_label">Filename: </p>
                </v-flex>
                <v-flex xs8 >
                    <p class="filename">{{name}}</p>
                </v-flex>
            </v-layout>
    </v-container>
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
        background: linear-gradient(to right, #301F66 , #316ECF);
        color: #fff;
        line-height: 20px;
        margin: 0;
        > .container.fluid {
            padding: 15px 30px 15px 30px;
        }
    }
    .filename_label, .filename {
        margin-bottom: 0;
        font-size: 14px;
    }
    .filename_label {
        color: rgba(255,255,255,0.5);
    }
/*
    .filename {
        
    }
*/
</style>