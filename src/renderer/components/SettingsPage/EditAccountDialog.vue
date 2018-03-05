<template>
<div>
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
      </v-container>
  </v-form>
  <button-bar :active="valid" @confirm="updateAccount" @cancel="cancelDialog" :applyText="'Update'"></button-bar>
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
import ButtonBar from '../Common/ButtonBar';
export default {
	name: 'edit-account-dialog',
  props: ['accountIndex', 'showDialog' ],
  components: { ButtonBar },
  methods: {
    updateAccount: function(){
      this.$store.commit('Wallet/SET_ACCOUNT_NAME_AT_INDEX', { name: this.$data.name, index: this.accountIndex});
      this.$emit("hide", true);
    },
    cancelDialog: function(){
      this.$emit("hide", true);
    },
    resetDialog: function(){
      this.$refs.editAccountForm.reset();
    },
    updateData: function(){
      this.name = this.$store.getters['Wallet/editAccount'].name;
      this.privateKey = this.$store.getters['Wallet/editAccount'].accountObject.privateKey;
      this.publicKey = this.$store.getters['Wallet/editAccount'].accountObject.address;
    }
  },
  data: function(){
    return {
      name: this.$store.getters['Wallet/editAccount'].name,
      privateKey: this.$store.getters['Wallet/editAccount'].accountObject.privateKey,
      publicKey: this.$store.getters['Wallet/editAccount'].accountObject.address,
      valid: false,
      rules: {
        validateName: (value)=>{
          let res = true;
          let txt = 'Name must be at least 6 characters long';
          if ( value===null){
            res = false;
          }
          else if ( value.length < 6 ){
            res = false;
          } else {
            res = true;
          }
          return res ? true: txt;
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
  },
  watch: { 
    accountIndex: function(newVal, oldVal) { 
      this.updateData();
    },
    showDialog: function(newVal, oldVal) { // watch it
      this.updateData();
    }
  }
}
</script>