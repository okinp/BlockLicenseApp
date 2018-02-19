<template>
    <div>
        <v-container fluid>
            <v-layout row wrap>
                <v-flex xs12 class="text-center">
                    <h1>Buy Tokens</h1>
                </v-flex>
                <v-flex xs2 offset-xs2 id="amount">
                    <v-text-field name="input-1" label="Amount" id="testing1" v-model="amount">
                    </v-text-field>
                </v-flex>
                <v-flex xs1 id="blt">
                  <p>BLT</p>
                </v-flex>
                <v-flex xs3 id="costInEth">
                  <p>( {{getCostInEth}} ETH )</p>
                </v-flex>
                <v-flex xs4 class="text-center">
                    <v-btn class="app-btn" v-on:click="performBuy" flat>Buy</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
  </div>
</template>
<script>
export default {
  name: 'buy-form',
  props: ['selectedIndex'],
  mounted: function(){
      this.$EthTools.contracts.BlockLicenseCrowdsale.deployed().then((instance)=>{
        this.crowdSaleAddress = instance.address;
      })
  },
  data: () => ({
      currencies: [
          { text: 'BLT', value: 0 },
          { text: 'ETH', value: 1 }
      ],
      currentCurrency: 1,
      recipientAccount: null,
      amount: null,
      crowdSaleAddress: null, 
      contract: null
  }),
  methods: {
      performBuy: function(){
        this.$EthTools.web3.eth.sendTransaction({
          from: this.selectedIndex,
          to: this.$EthTools.crowdsaleAddress,
          gas: 4712388,
          value: this.$EthTools.web3.utils.toWei(String(this.getCostInEth))
        })
        // .then( (receipt)=>{
        //     console.log(receipt);
        // })
        .catch((err)=>{
          console.log(err.message);
        })
        this.amount = null;
      }
  },
  computed: {
      getCostInEth: function(){
          return this.amount/this.$EthTools.rate;
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
    }
    .layout .app-btn {
        background-color: #3857B9 !important;
        color: white;
        width: 127px;
        height: 54px;
        border-radius: 5px;
    }
    #blt, #costInEth {
        font-size: 16px;
        line-height: 65px;
    }
    #costInEth > p {
        color: gray;
    }
</style>