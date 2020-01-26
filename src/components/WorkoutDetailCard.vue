<template>
  <v-card class="WorkoutDetailCard">
    <v-card-title class="flex-nowrap justify-space-between align-start">
      <template v-if="!editable">
        <span>{{ workout.name }}</span>
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
        <v-text-field
          v-model="form.name"
          label="Název"
        />
        <v-btn
          class="ml-5 mr-3"
          color="accent"
          dark
          fab
          small
          @click="cancelEdit"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-btn
          class="mr-3"
          color="success"
          dark
          fab
          small
          @click="saveWorkout"
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
          v-model="form.tags"
          :items="tags"
          :hide-details="true"
          item-text="name"
          item-value="id"
          chips
          dense
          filled
          small-chips
          multiple
          label="Tagy"
          autocomplete="add-workout-form-tag"
        />
        <v-row>
          <v-col>
            <v-text-field
              v-model="form.rounds"
              type="number"
              label="Počet kol"
              prepend-inner-icon="mdi-restore"
              min="0"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="form.shortRest"
              prepend-inner-icon="mdi-timer-sand"
              type="number"
              label="Krátká pauza"
              hint="Mezi cviky"
              min="0"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="form.longRest"
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
      <div class="subtitle-2 mb-2">
        <v-icon small>
          mdi-dumbbell
        </v-icon>
        Cviky:
      </div>
      <div class="WorkoutDetailCard__dropArea">
        <v-expansion-panels>
          <draggable
            v-model="form.exercises"
            :disabled="!editable"
            :move="handleMove"
            v-bind="draggableOptions"
            style="width: 100%"
          >
            <WorkoutExercisePanel
              v-for="item in form.exercises"
              :key="`WorkoutItem-${item.id}`"
              :editable="editable"
              :exercise="item"
              :default-rest="form.shortRest"
              @exerciseInput="updateExercisePivot"
            />
          </draggable>
        </v-expansion-panels>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import draggable from 'vuedraggable'
import WorkoutExercisePanel from './WorkoutExercisePanel'

const defaultForm = {
  name: '',
  rounds: '',
  shortRest: '',
  longRest: '',
  tags: [],
  exercises: [],
}

export default {
  components: { draggable, WorkoutExercisePanel },
  props: {
    create: {
      type: Boolean,
      default: false,
    },
    editable: {
      type: Boolean,
      default: false,
    },
    workout: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      form: this.workout ? this.workout : defaultForm,
      draggableOptions: {
        group: {
          name: 'workoutExercises',
        },
      },
    }
  },
  computed: {
    ...mapGetters({
      tags: 'tags/getAll',
    }),
  },
  methods: {
    saveWorkout() {
      this.toggleEditable(false)
    },
    cancelEdit() {
      console.log(this.create)
      if (this.create) {
        this.$router.push({ name: 'workouts' })
        return
      }

      this.toggleEditable(false)
    },
    toggleEditable(editable) {
      this.$emit('edit', editable)
    },
    updateExercisePivot({ id, pivot }) {
      this.form.exercises = this.form.exercises.map(item => {
        if (item.id === id) {
          console.log('yeah wtf')
          console.log(item.id, id)
          console.log(item.id === id)
          item.pivot = pivot
        }

        return item
      })
    },
    handleMove(event) {
      console.log(event)
      return false
    },
  },
}
</script>

<style lang="scss">
  .WorkoutDetailCard {
    .theme--dark.v-chip:not(.v-chip--active) {
      background: #2979ff;
    }
  }
  .WorkoutDetailCard__dropArea {
    min-height: 50px;
    padding: 5px 5px;
    margin: -5px;
    border: 2px dashed #212121;
  }
</style>
