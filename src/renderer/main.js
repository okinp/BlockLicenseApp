import Vue from 'vue'
import axios from 'axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import 'material-design-icons'
import App from './App'
import router from './router'
import store from './store'

var remote = require('electron').remote;
var buildEditorContextMenu = remote.require('electron-editor-context-menu');

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
        var w = this.web3;
        var BlockLicenseCrowdsaleArtifact = require('../../build/contracts/BlockLicenseCrowdsale.json');
        var BLTokenArtifact = require('../../build/contracts/BLToken.json');
        var contract = require("truffle-contract");
        let CrowdsaleContract = contract(BlockLicenseCrowdsaleArtifact);
        CrowdsaleContract.setProvider(EthTools.web3Provider);  
        if (typeof CrowdsaleContract.currentProvider.sendAsync !== "function") {
            CrowdsaleContract.currentProvider.sendAsync = function() {
                return CrowdsaleContract.currentProvider.send.apply(CrowdsaleContract.currentProvider, arguments);
            };
        }
        let TokenContract = contract(BLTokenArtifact);
        TokenContract.setProvider(EthTools.web3Provider);
        EthTools.contracts.BlockLicenseCrowdsale = CrowdsaleContract;
        EthTools.contracts.TokenContract = TokenContract;
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

window.addEventListener('contextmenu', function(e) {
  // Only show the context menu in text editors.
  if (!e.target.closest('textarea, input, [contenteditable="true"]')) return;

  var menu = buildEditorContextMenu();

  // The 'contextmenu' event is emitted after 'selectionchange' has fired but possibly before the
  // visible selection has changed. Try to wait to show the menu until after that, otherwise the
  // visible selection will update after the menu dismisses and look weird.
  setTimeout(function() {
    menu.popup(remote.getCurrentWindow());
  }, 30);
});



/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
