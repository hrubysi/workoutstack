import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/views/HomePage'
import ExercisesPage from '@/views/ExercisesPage'
import WorkoutsPage from '@/views/WorkoutsPage'
import WorkoutDetailPage from '@/views/WorkoutDetailPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/exercises/create',
    name: 'createExercise',
    component: ExercisesPage,
    props: {
      create: true,
    },
  },
  {
    path: '/exercises/edit/:id',
    name: 'editExercise',
    component: ExercisesPage,
    // props: {
    //   edit: true,
    // },
  },
  {
    path: '/exercises',
    name: 'exercises',
    component: ExercisesPage,
  },
  {
    path: '/workouts/create',
    name: 'createWorkout',
    component: WorkoutDetailPage,
    props: {
      create: true,
    },
  },
  {
    path: '/workouts/:slug',
    name: 'workout-detail',
    component: WorkoutDetailPage,
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
