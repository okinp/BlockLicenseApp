<template>
<div>
  <v-form v-model="valid" ref="newAccountForm" id="account-form"  v-on:submit.prevent>
    <h1>New Account</h1>
    <div class="selection">            
      <v-radio-group v-model="autoKey" row :mandatory="true">
          <v-radio label="Auto Key" value='1' ></v-radio>
          <v-radio label="Manual Key" value='0'></v-radio>
      </v-radio-group>
    </div>
    <div class="middle-content">
      <div>
        <v-text-field label="Name" v-model="name" :rules="[rules.validateName]" required/>
        <v-text-field v-if="autoKey=='0'" label="Private Key" v-model="privateKey" :rules="[rules.validatePrivateKey]" required/>
      </div>
    </div>          
  </v-form>
  <button-bar :active="valid" @confirm="addAccount" @cancel="resetDialog" :applyText="'Add Account'"></button-bar>
</div>
</template>
<style lang="scss" scoped>
 #account-form {
  height: 270px;
  width: 100%;
  padding: 0 16px;
  h1 {
    text-align: center;
  }
  .selection {
    width: 250px;
  }
  .middle-content {
    height: 148px;
    display: flex;
    flex-direction: column;
  }
 }
</style>
<script>
import ButtonBar from "../Common/ButtonBar";
export default {
	name: 'new-account-dialog',
  components: { ButtonBar },
	methods: {
    reset: function(){
      this.$refs.newAccountForm.reset();
    },
    resetDialog: function(){
      this.$refs.newAccountForm.reset();
      this.name=null;
      this.privateKey=null;
      this.autoKey = '1';
      this.$emit('hide', true);
    },
    addAccount: function(){
      var account = null;
      if ( this.autoKey==='1' )
      {
          account = this.$evm.createRandomAccount();       
      } else {
          account = this.$evm.createAccountFromPrivateKey(this.privateKey);
      }
      var w = { name: this.name, accountObject: account };
      this.$store.commit('Wallet/ADD_ACCOUNT', w);
      this.resetDialog();
    },
  },
  data: function(){
    return {
      name: '',
      privateKey: '',
      valid: false,
      rules: {
        validateName: (value)=>{
          let txt = '';
          let res = false;
          if (value=='' || value==null)
          {
            txt = 'You need to supply a name';
          } else if (value.length < 6 ){
            txt = 'Name must be at least 6 characters long'
          } else {
            res = true;
          }
          return res ? true : txt;
        },
        validatePrivateKey: (value)=>{
            const ethUtil = require('ethereumjs-util');
            var isValid = null;
            if (value===null){
              this.valid = false;
            }  else {
              isValid = this.$evm.isValidPrivateKey(value);
            }
            return isValid? true:'Invalid Key'
        }
      },
      autoKey: '1',
    }
  }
}
</script>