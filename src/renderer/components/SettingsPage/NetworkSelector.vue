<template>
    <v-container fluid id="network">
        <v-layout row wrap>
            <v-flex xs12 class="text-center">
                <v-select
                    v-bind:items="items"
                    label="Network"
                    single-line
                    bottom >
                </v-select>
            </v-flex>
        </v-layout>
    </v-container>

</template>
<script>
export default {
    name: 'network-selector',
    data: () => ({
        items: [
            {text: 'Main Net'},
            {text: 'Ropsten Net'}, 
            {text: 'Test Net'}, 
            {text: 'localhost'},            
        ]
    })
}
</script>
<style lang="scss" scoped>
    #network {
        padding: 48px 40px 0px 40px;
    }
</style>