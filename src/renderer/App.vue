<template>
  <v-app id="bl-app">
      <header-nav/>
      <router-view></router-view>
  </v-app>
</template>

<script>
  import HeaderNav from './components/Common/HeaderNav'
  export default {
    name: 'blocklicenseapp',
    components: {HeaderNav},
    methods: {
      getBalanceEth: function(idx){
          let w = this.$store.getters['Wallet/accountAtIndex'](idx);
          let address = w.accountObject.address;
          //console.log('Public Key: ' + address);
          let balance = this.$EthTools.web3.eth.getBalance(String(address))
          .then( res => {
            var balanceToSet =  parseFloat(this.$EthTools.web3.utils.fromWei(res,'ether')).toFixed(4);
            let data = {
              index: idx,
              balance: parseFloat(this.$EthTools.web3.utils.fromWei(res,'ether')).toFixed(4)
            }
            console.log(1);
            console.log(data);
            this.$store.commit('Wallet/SET_ETH_BALANCE', data);
          })
          .catch(err=>console.log(err.message));
      },
      getBalances: function(){
        let numAccounts = this.$store.getters['Wallet/accounts'].length;
        console.log("Number of Accounts: " + numAccounts);
        for ( var i=0; i < numAccounts; i++)
        {
          this.getBalanceEth(i);
        }
      },
    },
    mounted: function(){
        this.getBalances();
        setInterval(function () {
          this.getBalances();
        }.bind(this), 15000);
    }
  };
  document.addEventListener('dragover', function (event) {
    event.preventDefault();
    return false;
  }, false);

  document.addEventListener('drop', function (event) {
    event.preventDefault();
    return false;
  }, false);
</script>

<style>
  @import url('../../node_modules/font-awesome/css/font-awesome.min.css');
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
</style>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    overflow-y: auto;
    background-color: rgb(248, 249, 250);
    height: 100%;
    body {
      font-family: 'Ubuntu', sans-serif;
      min-height: 100%;
    }
  }

  html, body {
    height:100%;
    width:100%; 
    padding:0; 
    margin:0; 
    min-width: 640px;
    min-height: 480px;
  }
  body {

  }


  h1 {
    color: #8F949D;
    margin: 50px 0 40px;
    font-size: 23px;
    font-weight: 300;
  }
  h2 {
    font-size: 18px;
    color: #666e7a;
    line-height: 45px;
    margin: 0;
  }
  .text-center {
    text-align: center;
  }
  #bl-app {
    width: 100%;
    height: 100%;
  }
  .application {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  .app-btn {
    background-color: #3857b9 !important;
    color: white !important;
  }
  .cancel-btn {
    color: #3857b9 !important;
  }
</style>