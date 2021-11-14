import { make } from "vuex-pathify"

const state = function () {
  return {
    selectedCulture: "",
    selectedRegion: "",
    selectedPriming: "",
  }
}

// automatically generate operations
const getters = { ...make.getters(state) }
const mutations = {
  ...make.mutations(state),

  // setting the store back to it's initial state (logout, etc.)
  reset(s) {
    Object.assign(s, state())
  },
}
const actions = { ...make.actions(state) }
console.log(actions)

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
