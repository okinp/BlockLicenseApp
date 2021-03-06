const state = {
accounts: [],
walletHidden: true,
isUpdateNotAdd: false
//  accounts: [
//            {name:'Main Wallet', balance: { eth: 120, blt: 96.2}, primary: true, edit: false},
//            {name:'BLT Wallet 2', balance: { eth: 12, blt: 8.2}, primary: false, edit: false},
//            {name:'BLT Wallet 3', balance: { eth: 11.3, blt: 198.2}, primary: false, edit: false},
//            {name:'BLT Wallet 4', balance: { eth: 2.6, blt: 60}, primary: false, edit: false},
// ],
}

const mutations = {
  CLEAR_WALLET: function(state){
    state.accounts = [];
    state.walletHidden = true;
    state.isUpdateNotAdd = false;
  },
  SET_PRIMARY_ACCOUNT:  function(state, idx) {
      if ( state.accounts[idx] !== void 0 ){
          state.accounts.map(function(x,i){
              x.primary = (i===idx)? true: false;
              return x;
          })
      }
  },
  SET_EDIT_ACCOUNT: function(state, idx) {
      if ( state.accounts[idx] !== void 0 ){
          state.accounts.map(function(x,i){
              x.edit = (i===idx)? true: false;
              return x;
          })
      }
  },
  SET_ACCOUNT_NAME: function(state, name) {
      var idx = getters.editIndex(state);
      if ( state.accounts[idx] !== void 0 ){
          state.accounts[idx].name = name; 
      }
  },
  SET_ACCOUNT_NAME_AT_INDEX: function(state, data){
      if ( state.accounts[data.index] !== void 0 ){
          state.accounts[data.index].name = data.name; 
      }
  },
  ADD_ACCOUNT: function(state, w){
      var newAccount = {name: w.name, balance: { eth: '0.0000', lcn: '0.0000'}, primary: false, edit: false, accountObject: w.accountObject };
      if (!state.accounts.length )
          newAccount.primary = true;
      state.accounts.push(newAccount);
  },
  DELETE_ACCOUNT: function(state, idx){
    let acc = state.accounts[idx];
    let wasPrimary = acc.primary;
    state.accounts.splice(idx,1);
    if ( wasPrimary && state.accounts.length > 0)
    {
      state.accounts[0].primary = true;
    } 
  },
  SET_ETH_BALANCE: function(state, data){
      state.accounts[data.index].balance.eth = data.balance;
  },
  SET_BLT_BALANCE: function(state, data){
      state.accounts[data.index].balance.blt = data.balance;
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  }
}

const getters = {
  accountObjects: state => {
      return state.accounts.map( function(entry){
          return entry.accountObject
      })
  },
  primaryAccount: state => {
    return state.accounts.find(function(w){
        return (w.primary === true)
    })
  },
  editAccount: state => {
    return state.accounts.find(function(w){
        return (w.edit === true)
    })
  },
  editIndex: state => {
    return state.accounts.findIndex(item => item.edit === true);
  },
  primaryIndex: state => {
      return state.accounts.map(function(elem){
          return elem.primary;
      }).indexOf(true);
  },
  accounts: state=> {
      return state.accounts;
  },
  isUpdate: state => {
      return state.isUpdateNotAdd;
  },
  accountAtIndex: function(state){
    let accounts = state.accounts;
    return idx => { return accounts[idx] };
  },
  nameAtIndex: function(state){
    let accounts = state.accounts;
    return idx => {
      if (state.accounts.length > idx ) {
        return state.accounts[idx].name; 
      }
       else {
        return "";
      }
    }
  }
}


export default {
  namespaced: true,
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
}
