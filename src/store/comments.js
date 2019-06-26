
import Comments from '../models/comments'
import { createMutationsFromModel } from '../utils/mapper'

export default {
  namespaced: true,
  state () {
    return new Comments()
  },
  mutations: {
    ...createMutationsFromModel(Comments)
  },
  actions: {
    initialize ({ commit }, issueId) {
      commit('issueId', issueId)
    }
  }
}
