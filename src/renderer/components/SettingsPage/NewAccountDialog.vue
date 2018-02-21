<template>
<div>
        <v-form v-model="valid" ref="form" id="account-form">
            <v-container fluid >
                <v-layout row wrap>
                    <v-flex xs12 class="text-center">
                        <h1>New Account</h1>
                    </v-flex>
                    <v-flex xs5>
                        <v-radio-group v-model="autoKey" row :mandatory="false">
                            <v-radio label="Auto Key" value='1' ></v-radio>
                            <v-radio label="Manual Key" value='0'></v-radio>
                        </v-radio-group>
                    </v-flex>
                </v-layout>
                <v-layout row wrap class="middle-content">
                      <v-flex xs12>
                       <v-text-field label="Name" v-model="name" :rules="[rules.validateName]">
                       </v-text-field>
                      </v-flex>
                      <v-flex xs12 v-if="autoKey=='0'">
                       <v-text-field label="Private Key" v-model="privateKey" :rules="[rules.validatePrivateKey]">
                       </v-text-field>
                      </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12 class="text-center">
                      <v-btn flat class="app-btn" v-on:click="addAccount" v-bind:class="{ 'btn--disabled': !valid}">Add Account</v-btn>
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

  input-group--active {
    .input-group--selection-controls__ripple::before {
      background-color: red;
    }
  }
 .middle-content {
  height: 148px;
 }
 #account-form {
  height: 492px;
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
	name: 'new-account-dialog',
	methods: {
      resetDialog: function(){
        console.log('reset dialog');
        this.name=null;
        this.privateKey=null;
      },
      cancelDialog: function(){
        this.resetDialog();
        this.$emit("cancel", true);
      },
      addAccount: function(){
          var account = null;
          if ( this.autoKey==='1' )
          {
              account = this.$EthTools.web3.eth.accounts.create(this.$EthTools.web3.utils.randomHex(32));       
          } else {
              account = this.$EthTools.web3.eth.accounts.privateKeyToAccount(this.privateKey.substring(0,2)=='0x'?this.privateKey:'0x'+this.privateKey);
          }
          var w = { name: this.name, accountObject: account };
          this.$store.commit('Wallet/ADD_ACCOUNT', w);
          this.$EthTools.wallet.add(account);
          this.$emit("formSubmitted", true);
          this.resetDialog();
          this.$emit("cancel", true);
      }
    },
    data: function(){
        return {
            name: '',
            privateKey: '',
            valid: false,
            rules: {
                validateName: function(value){
                    return value.length >= 6 ? true : 'Name must be at least 6 characters long'
                },
                validatePrivateKey: function(value){
                    const ethUtil = require('ethereumjs-util');
                    var isValid = false;
                    try {
                        isValid = ethUtil.isValidPrivate(Buffer.from(value,'hex'));
                    }
                    catch(err) {
                        isValid = false;
                    }
                    return isValid? true:'Invalid Key'
                }
            },
            autoKey: '1',
        }
    }
}
</script>