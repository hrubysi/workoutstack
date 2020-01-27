import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/views/HomePage'
import ExercisesPage from '@/views/ExercisesPage'
import WorkoutsPage from '@/views/WorkoutsPage'
import WorkoutDetailPage from '@/views/WorkoutDetailPage'
import WorkoutEditPage from '@/views/WorkoutEditPage'

import { getToken } from '@/plugins/apollo'

Vue.use(VueRouter)

const beforeEnter = (to, from, next) => {
  next(!!getToken())
}

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomePage,
  // },
  {
    path: '/',
    name: 'home',
    component: ExercisesPage,
    beforeEnter(to, from, next) {
      next('/exercises')
    },
  },
  {
    path: '/exercises/create',
    name: 'createExercise',
    component: ExercisesPage,
    props: {
      create: true,
    },
    beforeEnter,
  },
  {
    path: '/exercises/detail/:id',
    name: 'exerciseDetail',
    component: ExercisesPage,
    props: {
      detail: true,
    },
  },
  {
    path: '/exercises',
    name: 'exercises',
    component: ExercisesPage,
  },
  {
    path: '/workouts/create',
    name: 'createWorkout',
    component: WorkoutEditPage,
    props: {
      create: true,
    },
    beforeEnter,
  },
  {
    path: '/workouts/:id',
    name: 'workoutDetail',
    component: WorkoutDetailPage,
  },
  {
    path: '/workouts/:id/edit',
    name: 'workoutEdit',
    component: WorkoutEditPage,
    beforeEnter,
  },
  {
    path: '/workouts',
    name: 'workouts',
    component: WorkoutsPage,
  },
]

const router = new VueRouter({
  routes,
})

export default router
