import apollo, { onLogin, onLogout } from '@/plugins/apollo'
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
  },
  getters: {
    getMe: state => {
      return state.me
    },
  },
  mutations: {
    SET_ME(state, data) {
      state.me = data
    },
    CLEAR_ME(state) {
      state.me = defaultValues.me
    },
  },
  actions: {
    async fetchUser({ commit, dispatch }, token) {
      await onLogin(apollo, token)
      apollo.query({
        query: queries.me,
      }).then((result) => {
        commit('SET_ME', result.data.me)
      }).catch(e => {
        console.log(e)
      })
    },
    register({ commit, dispatch }, { email, name, password, then = () => {} }) {
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
        then(mutationResult)
      })
      // commit('SET_USER', result.data.login)
      // dispatch('snackbar/setSnack', {
      //   snack: 'Byl jsi přihlášen.',
      //   type: 'success',
      // }, { root: true })
    },
    login({ commit, dispatch }, { username, password, then = () => {} }) {
      let mutationResult = false
      apollo.mutate({
        mutation: mutations.login,
        variables: {
          username,
          password,
        },
      }).then((result) => {
        mutationResult = result
        dispatch('fetchUser', result.data.login.access_token)
      }).catch(e => {
        console.log(e)
      }).finally(() => {
        then(mutationResult)
      })
      // commit('SET_USER', result.data.login)
      // dispatch('snackbar/setSnack', {
      //   snack: 'Byl jsi přihlášen.',
      //   type: 'success',
      // }, { root: true })
    },
    logout({ commit, dispatch }, { then = () => {} }) {
      apollo.mutate({
        mutation: mutations.logout,
      }).then((result) => {
        then(result)
        onLogout()
        commit('CLEAR_ME')
      }).catch(e => {
        console.log(e)
      })
      // commit('SET_USER', result.data.login)
      // dispatch('snackbar/setSnack', {
      //   snack: 'Byl jsi přihlášen.',
      //   type: 'success',
      // }, { root: true })
    },
  },
}
