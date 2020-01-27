import apollo, { onLogin, onLogout, getToken } from '@/plugins/apollo'
import { mutations, queries } from '@/graphql/users'

const defaultValues = {
  me: {
    id: null,
    name: '',
    email: '',
  },
}

export default {
  namespaced: true,
  state: {
    me: defaultValues.me,
    loading: false,
  },
  getters: {
    getMe: state => {
      return state.me
    },
    isLoggedIn: state => {
      return !!state.me.id
    },
    isLoading: state => {
      return state.loading
    },
  },
  mutations: {
    SET_ME(state, data) {
      state.me = data
    },
    CLEAR_ME(state) {
      state.me = defaultValues.me
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
  },
  actions: {
    async fetchUser({ commit, dispatch }, token) {
      if (!token) {
        token = getToken()
        if (!token) {
          return
        }
      }

      commit('SET_LOADING', true)
      await onLogin(apollo, token)
      apollo.query({
        query: queries.me,
      }).then((result) => {
        commit('SET_ME', result.data.me)
      }).catch(e => {
        console.log(e)
      }).finally(() => {
        commit('SET_LOADING', false)
      })
    },
    register({ commit, dispatch }, { email, name, password, then = () => {} } = {}) {
      commit('SET_LOADING', true)
      let mutationResult = false
      apollo.mutate({
        mutation: mutations.register,
        variables: {
          email,
          name,
          password,
        },
      }).then((result) => {
        mutationResult = result
        dispatch('fetchUser', result.data.register.tokens.access_token)
      }).catch(e => {
        console.log(e)
      }).finally(() => {
        commit('SET_LOADING', false)
        then(mutationResult)
      })
      // commit('SET_USER', result.data.login)
      // dispatch('snackbar/setSnack', {
      //   snack: 'Byl jsi přihlášen.',
      //   type: 'success',
      // }, { root: true })
    },
    login({ commit, dispatch }, { email, password, then = () => {} } = {}) {
      commit('SET_LOADING', true)
      let mutationResult = false
      apollo.mutate({
        mutation: mutations.login,
        variables: {
          email,
          password,
        },
      }).then((result) => {
        mutationResult = true
        dispatch('fetchUser', result.data.login.access_token)
      }).catch(e => {
        console.log(e)
      }).finally(() => {
        then(mutationResult)
        commit('SET_LOADING', false)
      })
      // commit('SET_USER', result.data.login)
      // dispatch('snackbar/setSnack', {
      //   snack: 'Byl jsi přihlášen.',
      //   type: 'success',
      // }, { root: true })
    },
    logout({ commit, dispatch }, { then = () => {} } = {}) {
      commit('SET_LOADING', true)
      apollo.mutate({
        mutation: mutations.logout,
      }).then((result) => {
        then(result)
        onLogout()
        commit('CLEAR_ME')
      }).catch(e => {
        console.log(e)
      }).finally(() => {
        commit('SET_LOADING', false)
      })
      // commit('SET_USER', result.data.login)
      // dispatch('snackbar/setSnack', {
      //   snack: 'Byl jsi přihlášen.',
      //   type: 'success',
      // }, { root: true })
    },
  },
}
