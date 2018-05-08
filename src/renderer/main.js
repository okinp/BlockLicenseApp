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

let clearLocalStorage = false;
if ( clearLocalStorage ){
    store.commit('Wallet/CLEAR_WALLET')
    store.commit('Licenses/CLEAR_LICENSES')
}

let evm = require('./ethToolkit');
let json = require('./Licenses.json');
evm.init(json.abi, '0x1006eDa5E481eBb9B7A9F92A8281AF1370D7EAFC');
let accts = store.getters['Wallet/accountObjects'];
let sz = accts.length;
accts.forEach(el => {
  evm.addAccount(el);
});

Vue.prototype.$evm = evm;

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
