<template>
    <div>
        <v-container fluid>
            <v-layout row wrap>
                <v-flex xs12 class="text-center">
                    <h1>Transfer</h1>
                </v-flex>
                <v-flex xs6 id="amount">
                     <v-text-field name="input-1" label="Amount" id="testing1" v-model="amount">
                     </v-text-field>
                </v-flex>
                <v-flex xs6 id="currency">
                  <p>ETH</p>
                </v-flex>
                <v-flex xs12>
                    <v-text-field name="input-1" label="Recipient Account" id="testing" v-model="recipientAccount"></v-text-field>
                </v-flex>
                <v-flex xs-12 class="text-center">
                    <v-btn class="app-btn" v-on:click="performTransfer" flat>TRANSFER</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
  </div>
</template>
<script>
export default {
  name: 'transfer-form',
  props: ['selectedIndex'],
  data: () => ({
      currencies: [
          { text: 'BLT', value: 0 },
          { text: 'ETH', value: 1 }
      ],
      currentCurrency: 1,
      recipientAccount: null,
      amount: null
  }),
  methods: {
      performTransfer: function(){ 
        console.log('Index is: ' + this.selectedIndex);
        if ( this.currentCurrency === 1 ){
          this.$EthTools.web3.eth.sendTransaction({ from: this.selectedIndex,
                                           to: this.recipientAccount,
                                           gas: 4712388,
                                           value: this.$EthTools.web3.utils.toWei(String(this.amount))
                                         })
          .then(function(receipt){
              console.log(receipt);
          })
          .then(function(){

          })
          .catch((err)=>{
            console.log("Catched Error");
            console.log(err.message);
          })          
        } else if ( this.currentCurrency === 0 )
        {
          let fromAddress = String(this.$EthTools.wallet[this.selectedIndex].address);
          let amount = this.$EthTools.web3.utils.toWei(String(this.amount));
          this.$EthTools.contracts.BlockLicenseCrowdsale.deployed().then((inst)=>{
            return inst.transfer(this.recipientAccount, amount, {from: fromAddress, gas: 30000 })
          })
          .then((result) => {
            console.log(result);
          })
          .catch(function(e) {
            console.log(e);
          })
          // let fromAddress = String(this.$EthTools.wallet[this.selectedIndex].address);
          // let amount = String(this.amount);
          // this.$EthTools.contracts.BlockLicenseCrowdsale.deployed().then((inst)=>{
          //   return inst.token();
          // })
          // .then(tk=>{
          //   let bltCoinInstance = this.$EthTools.contracts.TokenContract.at(tk);
          //   return bltCoinInstance;
          // })
          // .then(coinInst => {
          //   console.log("----FromAddresses-----" + fromAddress);
          //   console.log("------Amount-------" + amount);
          //   coinInst.balanceOf(fromAddress).then(bal=>console.log('f-ing balance: ' + bal));
          //   return coinInst.transfer(this.recipientAccount, String('5000000000000000000'), {from: fromAddress, gas: 30000 })})
          // .then(function(result) {
          //   // If this callback is called, the transaction was successfully processed.
          //   if( result ){
          //   alert("Transaction successful!")              
          // }
          //   console.log(result);
          // }).catch(function(e) {
          //   // There was an error! Handle it.
          //   console.log(e);
          // })
        } else {
          console.log('Error in selected Index');
        }
        this.recipientAccount = this.amount = null;
      }
  }
}
</script>
<style lang="scss">
    .text-center > h1 {
        letter-spacing: normal;
    }
    #amount {
        padding-right: 12px;
    }
    #currency {
        padding-left: 12px;
        .input-group__selections__comma {
            font-size: 14px;
        }
        align-items: center;
    }
    .layout .app-btn {
        background-color: #3857B9 !important;
        color: white;
        width: 127px;
        height: 54px;
        border-radius: 5px;
    }
</style>