<template>
  <v-card>
    <v-card-title class="flex-nowrap justify-space-between align-start">
      <template v-if="!editable">
        <span>Workout name</span>
        <div class="d-flex ml-5">
          <v-btn
            class="mr-3"
            color="primary"
            dark
            fab
            small
            @click="toggleEditable(true)"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            color="accent"
            dark
            fab
            small
            @click="x = true"
          >
            <v-icon>mdi-play</v-icon>
          </v-btn>
        </div>
      </template>
      <template v-else>
        <v-text-field value="Workout name" />
        <v-btn
          class="ml-5 mr-3"
          color="accent"
          dark
          fab
          small
          @click="saveWorkout"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-btn
          class="mr-3"
          color="success"
          dark
          fab
          small
          @click="cancelEdit"
        >
          <v-icon>mdi-check</v-icon>
        </v-btn>
      </template>
    </v-card-title>

    <v-card-subtitle>
      <template v-if="!editable">
        <div class="d-flex align-center mt-4">
          <div class="d-flex align-center mr-3">
            <v-icon class="mr-2">
              mdi-timer
            </v-icon>
            <span class="subtitle-2">5 kol</span>
          </div>
          <div class="d-flex align-center mr-3">
            <v-icon class="mr-2">
              mdi-dumbbell
            </v-icon>
            <span class="subtitle-2">8 cviků</span>
          </div>
          <div class="d-flex align-center">
            <v-icon class="mr-2">
              mdi-timer-sand
            </v-icon>
            <span class="subtitle-2">30s / 60s</span>
          </div>
          <v-spacer />
          <v-chip
            v-for="(n) in 3"
            :key="n"
            class="mr-1 mb-1"
            color="primary"
            small
          >
            Tag
          </v-chip>
        </div>
      </template>
      <template v-else>
        <v-autocomplete
          chips
          dense
          filled
          small-chips
          label="Tagy"
          hide-details=""
        />
        <v-row>
          <v-col>
            <v-text-field
              type="number"
              label="Počet kol"
              prepend-inner-icon="mdi-restore"
              min="0"
            />
          </v-col>
          <v-col>
            <v-text-field
              prepend-inner-icon="mdi-timer-sand"
              type="number"
              label="Krátká pauza"
              hint="Mezi cviky"
              min="0"
            />
          </v-col>
          <v-col>
            <v-text-field
              prepend-inner-icon="mdi-timer-sand"
              type="number"
              label="Dlouhá pauza"
              hint="Mezi koly"
              min="0"
            />
          </v-col>
        </v-row>
      </template>
    </v-card-subtitle>

    <v-card-text>
      <v-expansion-panels>
        <draggable
          :disabled="!editable"
          :list="list"
          :options="draggableOptions"
          style="width: 100%"
        >
          <WorkoutExercisePanel
            v-for="(item, i) in list"
            :key="`itemx${i}`"
            :editable="editable"
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
  props: {
    editable: {
      type: Boolean,
      default: false,
    },
    workout: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      draggableOptions: {
        group: {
          name: 'workoutExercises',
        },
      },
      list: [
        {
          name: 'WTF Squats',
        },
        {
          name: 'WTF Squats2',
        },
        {
          name: 'WTF Squats3',
        },
      ],
    }
  },
  methods: {
    saveWorkout() {
      this.toggleEditable(false)
    },
    cancelEdit() {
      this.toggleEditable(false)
    },
    toggleEditable(editable) {
      this.$emit('edit', editable)
    },
  },
}
</script>

<style scoped>

</style>
