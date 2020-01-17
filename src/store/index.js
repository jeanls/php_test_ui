import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        inRequest: false
    },
    mutations: {
        setRequest(state, n) {
            state.inRequest = n;
        }
    },
    getters: {
        getRequest: state => {
            return state.inRequest;
        }
    },
    actions: {},
    modules: {}
})
