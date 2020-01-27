<template>
  <v-container>
    <h1 class="headline mb-3">
      <template v-if="create">
        Vytvoření nového cvičebního plánu
      </template>
      <template v-else>
        Úprava cvičebního plánu
      </template>
    </h1>
    <v-row>
      <v-col md="6">
        <WorkoutDetailCard
          :editable="true"
          :create="create"
          :workout="workout"
        />
      </v-col>
      <v-col md="6">
        <WorkoutAddExercises/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import WorkoutAddExercises from '@/components/WorkoutAddExercises'
import WorkoutDetailCard from '@/components/WorkoutDetailCard'

export default {
  components: { WorkoutAddExercises, WorkoutDetailCard },
  props: {
    create: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      loading: 'workouts/isLoading',
      getWorkout: 'workouts/find',
    }),
    workout() {
      const id = this.$route.params.id
      if (id && !this.loading) {
        return this.getWorkout(id)
      }

      return null
    },
  },
}
</script>

<style scoped>

</style>
