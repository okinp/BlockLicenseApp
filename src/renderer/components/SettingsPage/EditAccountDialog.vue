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
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 class="text-center">
                  <v-btn flat class="app-btn" v-on:click="updateAccount" v-bind:class="{ 'btn--disabled': !valid}">Update</v-btn>
              </v-flex>
              <v-flex xs12 class="text-center">
                  <v-btn flat class="cancel-btn" v-on:click="cancelDialog">Cancel</v-btn>
              </v-flex>
            </v-layout>
        </v-container>
    </v-form>
</div>
</template>
<style lang="scss" scoped>
 .middle-content {
    height: 148px;
 }
 #account-form {
  height: 480px;
  .container-fluid {
    flex-grow: 1;
  }
 }
  button.app-btn {
    background-color: #3857b9 !important;
    color: white !important;
  }
  .cancel-btn {
    color: #3857b9 !important;
  }
</style>
<script>
export default {
	name: 'edit-account-dialog',
  props: ['accountIndex'],
  methods: {
    updateAccount: function(){
      this.$store.commit('Wallet/SET_ACCOUNT_NAME_AT_INDEX', { name: this.$data.name, index: accountIndex});
      // this.$emit("editAccount", true);
      // this.$emit("formSubmitted", true);
      this.$emit("cancel", true);
    },
    cancelDialog: function(){
      this.$emit("cancel", true);
    },
  },
  data: function(){
    return {
        // name: this.$store.getters['Wallet/accountAtIndex'](accountIndex).name,
        // privateKey: this.$store.getters['Wallet/accountAtIndex'](accountIndex).accountObject.privateKey,
        // publicKey: this.$store.getters['Wallet/accountAtIndex'](accountIndex).accountObject.address,
        name: null,
        privateKey: null,
        publicKey: null,
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