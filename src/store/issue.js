
import Issue from '../models/issue'
import { createMutationsFromModel } from '../utils/mapper'

export default {
  namespaced: true,
  state () {
    return new Issue()
  },
  mutations: {
    ...createMutationsFromModel(Issue)
  },
  actions: {
    async save ({ dispatch }) {

    },
    async initialize ({ commit }, id) {
      commit('id', id)
    }
  }
}
