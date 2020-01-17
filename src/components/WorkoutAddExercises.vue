<template>
  <v-card>
    <v-card-title>Dostupné cviky</v-card-title>
    <v-card-subtitle />
    <v-card-text>
      <v-expansion-panels>
        <draggable
          :options="draggableOptions"
          style="width: 100%"
          :list="list"
          :sort="false"
          @change="draggableChange"
        >
          <WorkoutExercisePanel
            v-for="(item, i) in list"
            :key="`AddExercise-${i}`"
            :exercise="item"
          />
        </draggable>
      </v-expansion-panels>
    </v-card-text>
  </v-card>
</template>

<script>
import draggable from 'vuedraggable'
import WorkoutExercisePanel from './WorkoutExercisePanel'
export default {
  components: { draggable, WorkoutExercisePanel },
  data() {
    return {
      test: 0,
      draggableOptions: {
        group: {
          name: 'workoutExercises',
          pull: 'clone',
        },
      },
      list: [
        {
          name: 'Jumping Squats',
        },
        {
          name: 'Jumping Squats2',
        },
        {
          name: 'Jumping Squats3',
        },
      ],
    }
  },
  methods: {
    draggableChange({ added }) {
      this.list.splice(added.newIndex, 1)
    },
  },
}
</script>

<style scoped>

</style>
