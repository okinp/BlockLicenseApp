<template>
<div>
  <close-bar @close="cancelDialog"></close-bar>
  <v-form v-model="valid" ref="editAccountForm">
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
import CloseBar from '../Common/CloseBar';
export default {
	name: 'edit-account-dialog',
  props: ['accountIndex', 'showDialog' ],
  components: { CloseBar },
  methods: {
    updateAccount: function(){
      this.$store.commit('Wallet/SET_ACCOUNT_NAME_AT_INDEX', { name: this.$data.name, index: this.accountIndex});
      this.$emit("cancel", true);
    },
    cancelDialog: function(){
      this.resetDialog();
      this.$emit("cancel", true);
    },
    resetDialog: function(){
      this.$refs.editAccountForm.reset();
    },
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
  },
  computed: {
    getName: function(){
      let account = this.$store.getters['Wallet/accountAtIndex'](this.accountIndex);
      this.name = account.name;
      return this.name;
    }
  }
  // computed: {
  //   updateData: function(){
  //     if (showDialog){
  //       this.name = this.$store.getters['Wallet/accountAtIndex'](this.accountIndex).name;
  //       this.privateKey = this.$store.getters['Wallet/accountAtIndex'](this.accountIndex).accountObject.privateKey;
  //       this.publicKey = this.$store.getters['Wallet/accountAtIndex'](this.accountIndex).accountObject.publicKey;
  //     }
  //   },
  // },
  // data: function(){
  //   let getter  = this.$store.getters['Wallet/accountAtIndex'](this.accountIndex);
  //   this.updateData();
  //   return {
  //       // name: getter.name,
  //       // privateKey: getter.accountObject.privateKey,
  //       // publicKey: getter.accountObject.address,
  //       name: '',
  //       privateKey: '',
  //       publicKey: '',
  //       valid: false,
  //       rules: {
  //         validateName: function(value){
  //             return value.length >= 6 ? true : 'Name must be at least 6 characters long'
  //         }
  //       }
  //   }
  // }
}
</script>