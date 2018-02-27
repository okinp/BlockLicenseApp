const state = {
    licenses: {
        open: [],
        closed: [],
        current: null
    }
}

const getters = {
    openLicenses: function(state){
        return state.licenses.open
    },
    closedLicenses: function(state){
        console.log('closed licenses getter')
        return state.licenses.closed
    },
    current: function(state){
        return state.current
    }
}

const actions = {

}

const mutations = {
    CLEAR_LICENSES: function(state){
        state.licenses.open = [];
        state.license.closed = [];
        state.licenses.current = null;
    },
    SET_CURRENT_LICENSE_OBJ: function(state, l){
      state.current = l;  
    },
    ADD_OPEN_LICENSE: function(state,l ){
        var el = state.licenses.open.find(function(v){
            return v.title === l.title;
        })
        if (el) {
            el = l
        } else {
            state.licenses.open.push(l)
        }
    },    
    ADD_CLOSED_LICENSE: function(state,l ){
        //console.log(l);
        var el = state.licenses.closed.find(function(v){
            return v.title === l.title;
        })
        if (el) {
            
//            console.log('element found!!')
//            console.log(l)
            el = l
        } else {
            state.licenses.closed.push(l)
        }
    },
    CLEAR_LICENSES: function(state){
        state.licenses.open= [];
        state.licenses.closed = [];
    }
}

export default {
  namespaced: true,
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
}