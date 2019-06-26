
import Issues from '../models/issues'
import { createMutationsFromModel } from '../utils/mapper'

export default {
  namespaced: true,
  state () {
    return new Issues()
  },
  mutations: {
    ...createMutationsFromModel(Issues)
  },
  actions: {
    initialize () {
      console.log('Hello World')
    }
  }
}
