import Vue from 'vue'
import axios from 'axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import 'material-design-icons'
import App from './App'
import router from './router'
import store from './store'

Vue.use(Vuetify)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

if ( false ){
    store.commit('Wallet/CLEAR_WALLET')
    store.commit('Licenses/CLEAR_LICENSES')
}

var EthTools = {
    web3Provider: null,
    web3: null,
    contracts: {},
    crowdsaleAddress: '0x345ca3e014aaf5dca488057592ee47305d9b3e10',
    tokenAddress: '0xf2beae25b23f0ccdd234410354cb42d08ed54981',
    rate: 2000,
    wallet: null,
    init: function(){
      EthTools.initWeb3();
      EthTools.initWallet();
      // EthTools.initContracts();
    },
    initWeb3: function(){
        var Web3 = require('web3');
        EthTools.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        EthTools.web3 = new Web3(EthTools.web3Provider);
    },
    initContracts: function(){

    },
    initWallet: function(){
        EthTools.wallet = EthTools.web3.eth.accounts.wallet.create(0, EthTools.web3.utils.randomHex(20));
        var accts = store.getters['Wallet/accountObjects'];
        var sz = accts.length;
        for (var i=0; i<sz; i++){
            EthTools.wallet.add(accts[i]);
        }
    }
}

EthTools.init();
Vue.prototype.$EthTools = EthTools;





/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
