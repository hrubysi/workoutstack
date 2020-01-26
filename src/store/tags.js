import apollo from '@/plugins/apollo'
import { queries } from '@/graphql/tags'

export default {
  namespaced: true,
  state: {
    tags: [],
    loading: false,
  },
  getters: {
    getAll: state => {
      return state.tags
    },
    find: (state) => (id) => {
      return state.tags.find(item => item.id === id)
    },
    isLoading: state => {
      return state.loading
    },
  },
  mutations: {
    SET_TAGS(state, tags) {
      state.tags = tags
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
  },
  actions: {
    async fetchTags({ commit }) {
      commit('SET_LOADING', true)
      apollo.query({
        query: queries.all,
      }).then((result) => {
        console.log(result)
        commit('SET_TAGS', result.data.tags)
      }).catch(e => {
        console.log(e)
      }).finally(() => {
        commit('SET_LOADING', false)
        // then()
      })
    },
  },
}
