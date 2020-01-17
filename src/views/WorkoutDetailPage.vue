<template>
  <v-container>
    <v-row>
      <v-col>
        <WorkoutCard
          :editable="edit"
          @edit="toggleEdit"
          @play="togglePlay"
        />
      </v-col>
      <v-col>
        <WorkoutAddExercises v-if="edit" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import WorkoutAddExercises from '@/components/WorkoutAddExercises'
import WorkoutCard from '@/components/WorkoutCard'

export default {
  components: { WorkoutAddExercises, WorkoutCard },
  props: {
    create: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      checkbox: true,
      edit: this.create,
      play: false,
    }
  },
  methods: {
    toggleEdit(edit = true) {
      this.edit = edit
    },
    togglePlay(play = true) {
      this.play = play
    },
  },
}
</script>

<style scoped>

</style>
