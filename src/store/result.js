import { make } from "vuex-pathify"

const state = function () {
  return {
    result: {
      rate: 0,
      CLADR: "",
      requirements: {
        water: {
          value: 0,
          description: "",
        },
        enegry: {
          value: 0,
          description: "",
        },
      },
    },
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

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
