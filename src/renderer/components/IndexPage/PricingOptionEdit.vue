<template>
<div>
    <v-flex xs8>
        <v-text-field label="Name" v-model="priceName" :rules="rules.validatePriceName"></v-text-field>
    </v-flex>
    <v-flex xs1>
        <v-text-field label="Price" v-model="priceValue" :rules="rules.validatePrice"></v-text-field>
    </v-flex>
    <v-flex xs1>
        <p class="text-center">BLT</p>
    </v-flex>
    <v-flex xs2>
        <a href="#" id="add-price" v-on:click="addPrice">- REMOVE OPTION</a>
    </v-flex>
</div>
</template>
<script>
    export default {
        name: "pricing-option-edit",
        data: function(){
            return {
                
            }
        }
    }
</script>