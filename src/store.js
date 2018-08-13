import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    score: 0,
    spaceLeft: 0,
    currentLevel: -1,
    resetGame: false,
    triggerNextLvl: false,
    isLose: false,
  },
  mutations: {  
    setScore(state, newScore) {
      state.score = newScore;
    },
    toggleLose(state) {
      state.isLose = !state.isLose;
    },
    setSpaceLeft(state, newVal) {
      state.spaceLeft = newVal;
    },
    addSpaceLeft(state, addVal) {
      state.spaceLeft += addVal;
    },
    setCurrentLevel(state, newLvl) {
      state.currentLevel = newLvl;
    },
    resetLvl(state) {
      state.currentLevel = -1;
    },
    nextLvl(state) {
      state.currentLevel += 1;
    },
    nextTimeout(state) {
      state.triggerNextLvl = true;
      setTimeout(function() {
        state.triggerNextLvl = false;
      }, 50);
    },
    triggerReset(state) {
      state.resetGame = true;
      setTimeout(function() {
        state.resetGame = false;
      }, 50);
    }
  },
  actions: {
    youWin ({ commit }) {
      commit('nextLvl');
      commit('nextTimeout');
    },
    youLose({commit}) {
      commit('toggleLose');
      commit('triggerReset');
      commit('resetLvl');
    }
  }
})
