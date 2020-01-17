import apollo, { onLogin, onLogout } from '@/plugins/apollo'
import { mutations, queries } from '@/graphql/exercises'

export default {
  namespaced: true,
  state: {
    exercises: [],
    loading: false,
  },
  getters: {
    getAll: state => {
      return state.exercises
    },
    isLoading: state => {
      return state.loading
    },
  },
  mutations: {
    SET_EXERCISES(state, exercises) {
      state.exercises = exercises
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
  },
  actions: {
    async fetchExercises({ commit }) {
      commit('SET_LOADING', true)
      apollo.query({
        query: queries.all,
      }).then((result) => {
        commit('SET_EXERCISES', result.data.exercises)
      }).catch(e => {
        console.log(e)
      }).finally(() => {
        commit('SET_LOADING', false)
      })
    },
  },
}
