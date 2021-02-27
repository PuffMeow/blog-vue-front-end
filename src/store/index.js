import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  isShowPlayer: false
};

const mutations = {
  changePlayerState(state, payload) {
    state.isShowPlayer = payload
  }
};

const actions = {

};

export default new Vuex.Store({
  state,
  mutations,
  actions,
});