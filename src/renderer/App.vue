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
          let account = this.$store.getters['Wallet/accountAtIndex'](idx);
          this.$evm.getBalanceFromAccount(account)
          .then( (res)=>{
            let data = {
              index: idx,
              balance: this.$evm.convertToEth(res)
            }
            this.$store.commit('Wallet/SET_ETH_BALANCE', data);
          })
          .catch( (err)=>{
            console.log(err.message);
          })
      },
      getBalances: function(){
        let accounts = this.$store.getters['Wallet/accounts'];
        accounts.forEach((account,idx) => {
          this.$evm.getBalanceFromAccount(account)
          .then( (res)=>{
            let data = {
              index: idx,
              balance: this.$evm.convertToEth(res)
            }
            this.$store.commit('Wallet/SET_ETH_BALANCE', data);
          })
          .catch( (err)=>{
            console.log(err.message);
          })      
        });
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
    box-sizing: border-box;
  }

  html {
    overflow-y: auto;
    background-color: rgb(248, 249, 250);
    min-height: 600px;
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
    min-width: 960px;
  }


  h1 {
    color: #8F949D;
    font-size: 23px;
    font-weight: 300;
  }

  h2 {
    color: #8F949D;
    font-size: 21px;
    font-weight: 100; 
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
    background-color: #3857b9;
    color: white !important;
  }
  .app-btn.btn--disabled {
    opacity: 0.5;
    .btn__content {
      color: white !important;
    }
  }
  .cancel-btn {
    color: #3857b9 !important;
  }
</style>