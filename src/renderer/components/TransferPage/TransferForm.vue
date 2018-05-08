<template>
    <div class="transferForm">
        <v-form v-model="valid" ref="transferForm" id="account-form">
        <v-container fluid>
            <v-layout row wrap>
                <v-flex xs12 class="text-center">
                    <h1>Transfer</h1>
                </v-flex>

                <v-flex xs12 id="amount">
                  <div id="currency">
                    <p>ETH</p>
                  </div>
                  <v-text-field name="input-1" label="Amount" id="testing1" v-model="value" :rules="[rules.validateValue]">
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field name="input-1" label="Recipient Account" id="testing" v-model="publicKey" :rules="[rules.validatePublicKey]"></v-text-field>
                </v-flex>
                <v-flex xs-12 class="text-center transferButton">
                    <v-btn class="app-btn" v-on:click="showConfirmationDialog" flat v-bind:class="{ 'btn--disabled': !valid}">TRANSFER</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
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
                validateValue: (value) =>{
                  if (value==null || value==''){                   
                    return 'Value cannot be empty';
                  }
                  var m = (/[\d]+(\.[\d]+)?/).exec(value);
                  if (m==null)
                  {
                    return 'Enter a number';
                  }
                  if (m[0].length != value.length) {
                    return 'Enter a number';
                  }
                  let valueInWei = this.$evm.toWei(this.value);
                  let balanceEth = this.$store.getters['Wallet/accounts'][this.selectedIndex].balance.eth;
                  let balanceEthWei = this.$evm.toWei(balanceEth);
                  if ( (balanceEthWei - 42000) >= valueInWei )
                  {
                    return true;
                  } else {
                    return 'Not enough balance';
                  }
                },
                validatePublicKey: (value)=>{
                  return this.$evm.isValidAddress(value)? true:'Invalid Address'
                }
            }
        }
    },
  methods: {
    performTransfer: function(){ 
      console.log('Index is: ' + this.selectedIndex);
      this.$evm.sendEther(this.selectedIndex, this.publicKey, this.value)
      .then( (receipt)=>{
        console.log(receipt);
        this.publicKey = this.value = null
      })
      .catch((err)=>{
        console.log(err.message);
      })
    },
    cancelDialog: function(){
      this.showDialog = false;
      this.publicKey = null;
      this.value = null;
      this.valid = false;
      this.$refs.transferForm.reset();
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
      height: 420px
    }
    .text-center > h1 {
        letter-spacing: normal;
    }
    #currency {
        position: relative;
        float: right;
        top: 85px;
        right: 0px;
        width: 50px;
        padding-left: 12px;
        font-weight: 500;
        font-size: 16px;
        line-height: 69px;
        color: #8F949D;
    }
    .layout .app-btn {
        background-color: #3857B9 !important;
        color: white;
        width: 127px;
        height: 54px;
        border-radius: 5px;
    }
</style>