import Vue from 'vue'
import axios from 'axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import 'material-design-icons'
import App from './App'
import router from './router'
import store from './store'
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);

var remote = require('electron').remote;
var buildEditorContextMenu = remote.require('electron-editor-context-menu');

Vue.use(Vuetify)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

if ( false ){
    //store.commit('Wallet/CLEAR_WALLET')
    store.commit('Licenses/CLEAR_LICENSES')
}

var evm = require('./ethToolkit');
let contractJson = require('../../build/contracts/Licenses.json');
var json = require('./../../build/contracts/Licenses.json');
evm.init(json.abi, '0x345ca3e014aaf5dca488057592ee47305d9b3e10');
var accts = store.getters['Wallet/accountObjects'];
var sz = accts.length;


for (var i=0; i<sz; i++){
    evm.addAccount(accts[i]);
}
console.log('-----------');
console.log(evm.web3);
console.log(evm.getWeb3());
Vue.prototype.$evm = evm;

//let axios = require('axios');
let price_usd =1000;

axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=5')
.then(function (response) {
  price_usd = response.data[1].price_usd;
  Vue.prototype.$price_usd = price_usd;
})
.catch(function (error) {
  console.log(error);
});



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
