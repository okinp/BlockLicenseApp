<template>
    <div class="transferForm">
        <v-form v-model="valid" ref="form" id="account-form">
        <v-container fluid>
            <v-layout row wrap>
                <v-flex xs12 class="text-center">
                    <h1>Transfer</h1>
                </v-flex>
                <v-flex xs9 id="amount">
                     <v-text-field name="input-1" label="Amount" id="testing1" v-model="value" :rules="[rules.validateNumber, rules.validateBalance]">
                     </v-text-field>
                </v-flex>
                <v-flex xs3 id="currency">
                  <p>ETH</p>
                </v-flex>
                <v-flex xs12>
                    <v-text-field name="input-1" label="Recipient Account" id="testing" v-model="publicKey" :rules="[rules.validatePublicKey]"></v-text-field>
                </v-flex>
                <v-flex xs-12 class="text-center transferButton">
                    <v-btn class="app-btn" v-on:click="showConfirmationDialog" flat v-bind:class="{ 'btn--disabled': !valid}">TRANSFER</v-btn>
                </v-flex>
            </v-layout>
        </v-container v-model>
        </v-form>
        <transfer-dialog  :shown="showDialog" :value="value" :address="publicKey"  @cancel="cancelDialog" @transfer="performTransfer"></transfer-dialog>
  </div>
</template>
<script>
import TransferDialog from './TransferDialog';
export default {
  name: 'transfer-form',
  props: ['selectedIndex'],
  components: { TransferDialog },
    data: function(){
        return {
            publicKey: '',
            value: null,
            valid: false,
            showDialog: false,
            rules: {
                validateBalance: function(value)
                {

                },
                validateValue: function(value){
                    return !isNaN(value) ? true : 'Enter numerical value';
                },
                validatePublicKey: function(value){
                    if (value== null )
                    {
                      return true;
                    }
                    const ethUtil = require('ethereumjs-util');
                    var isValid = false;
                    try {
                        isValid = ethUtil.isValidAddress(value);
                    }
                    catch(err) {
                        isValid = false;
                    }
                    return isValid? true:'Invalid Address'
                }
            }
        }
    },
  methods: {
    performTransfer: function(){ 
      console.log('Index is: ' + this.selectedIndex);
      this.$EthTools.web3.eth.sendTransaction({ from: this.selectedIndex,
                                       to: this.publicKey,
                                       gas: 22000,
                                       value: this.$EthTools.web3.utils.toWei(String(this.value))
                                     })
      .then(function(receipt){
          console.log(receipt);
      })
      .then(()=>{
        this.publicKey = this.value = null;
      })
      .catch((err)=>{
        console.log("Catched Error");
        console.log(err.message);
      })
    },
    cancelDialog: function(){
      this.showDialog = false;
      this.publicKey = null;
      this.value = null;
      this.valid = false;
    },
    showConfirmationDialog: function(){
      this.showDialog = true;
    } 
  }
}
</script>
<style lang="scss">
    .transferForm {
      width: 100%;
      height: 400px;
      display: flex;
      flex-grow: 1;
      justify-content: center;
      align-items: center;
    }
    .transferButton {
      padding-top: 40px;
    }
    #account-form {
      width: 80%;
      height: 621px
    }
    .text-center > h1 {
        letter-spacing: normal;
    }
    #amount {
        padding-right: 12px;
    }
    #currency {
        padding-left: 12px;
        font-weight: 500;
        font-size: 16px;
        align-items: center;
        line-height: 69px;
        color: #8F949D;
        display: flex;
        justify-content: flex-end;
    }
    .layout .app-btn {
        background-color: #3857B9 !important;
        color: white;
        width: 127px;
        height: 54px;
        border-radius: 5px;
    }
</style>