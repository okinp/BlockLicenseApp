<template>
    <div>
        <v-form v-model="valid" ref="form">
            <v-container fluid id="account-list">
                <v-layout row wrap>
                    <v-flex xs12 class="text-center">
                        <h1>Edit Account</h1>
                    </v-flex>
                    <v-flex xs12>
                     <v-text-field label="Name" v-model="name" :rules="[rules.validateName]">
                     </v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field label="Public Key" v-model="publicKey" disabled></v-text-field>
                    </v-flex>

                    <v-flex xs12 class="text-center">
                        <v-btn id="app-btn" v-on:click="update" v-bind:class="{ 'btn--disabled': !valid}">Apply</v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-form>
  </div>
</template>
<script>
export default {
    name: 'edit-account',
    computed: {
        getEditAccount: function(){
            return this.$store.getters['Wallet/editAccount'];
        }
    },
    methods: {
        update: function(){
            this.$store.commit('Wallet/SET_ACCOUNT_NAME', this.$data.name);
            this.$emit("editAccount", true);
            this.$emit("formSubmitted", true);
        }
    },
    data: function(){
        return {
            name: this.$store.getters['Wallet/editAccount'].name,
            privateKey: this.$store.getters['Wallet/editAccount'].accountObject.privateKey,
            publicKey: this.$store.getters['Wallet/editAccount'].accountObject.address,
            valid: false,
            rules: {
                validateName: function(value){
                    return value.length >= 6 ? true : 'Name must be at least 6 characters long'
                }
            }
        }
    }
}
</script>