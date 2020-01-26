import apollo from '@/plugins/apollo'
import { mutations, queries } from '@/graphql/workouts'

export default {
  namespaced: true,
  state: {
    workouts: [],
    loading: false,
  },
  getters: {
    getAll: state => {
      return state.workouts
    },
    find: (state) => (id) => {
      return state.workouts.find(item => item.id === id)
    },
    isLoading: state => {
      return state.loading
    },
  },
  mutations: {
    ADD_WORKOUT(state, workout) {
      state.workouts.push(workout)
    },
    UPDATE_WORKOUT(state, workout) {
      state.workouts = state.workouts.map(item => {
        return item.id === workout.id ? workout : item
      })
    },
    SET_WORKOUTS(state, workouts) {
      state.workouts = workouts
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    REMOVE_WORKOUT(state, id) {
      state.workouts = state.workouts.filter(workout => workout.id !== id)
    },
  },
  actions: {
    fetchWorkouts({ commit }, { then = () => {} } = {}) {
      commit('SET_LOADING', true)
      apollo.query({
        query: queries.all,
      }).then((result) => {
        commit('SET_WORKOUTS', result.data.workouts)
      }).catch(e => {
        console.log(e)
      }).finally(() => {
        commit('SET_LOADING', false)
        then()
      })
    },
    create({ commit }, { userId, exercise, then = () => {} } = {}) {
      commit('SET_LOADING', true)
      apollo.mutate({
        mutation: mutations.create,
        variables: {
          user_id: userId,
          ...exercise,
        },
      }).then((result) => {
        commit('ADD_WORKOUT', result.data.createWorkout)
      }).catch(e => {
        console.log(e)
      }).finally(() => {
        commit('SET_LOADING', false)
        then()
      })
    },
    update({ commit }, { exercise, then = () => {} } = {}) {
      commit('SET_LOADING', true)
      apollo.mutate({
        mutation: mutations.update,
        variables: exercise,
      }).then((result) => {
        commit('UPDATE_WORKOUT', result.data.updateWorkout)
      }).catch(e => {
        console.log(e)
      }).finally(() => {
        commit('SET_LOADING', false)
        then()
      })
    },
    remove({ commit }, { id, then = () => {} } = {}) {
      commit('SET_LOADING', true)
      apollo.mutate({
        mutation: mutations.remove,
        variables: { id },
      }).then((result) => {
        commit('REMOVE_WORKOUT', result.data.removeWorkout.id)
      }).catch(e => {
        console.log(e)
      }).finally(() => {
        commit('SET_LOADING', false)
        then()
      })
    },
  },
}
