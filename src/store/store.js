import Vue from 'vue'
import Vuex from 'vuex'

import exercises from './exercises'
import user from './user'
import tags from './tags'
import workouts from './workouts'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    exercises,
    user,
    tags,
    workouts,
  },
})
