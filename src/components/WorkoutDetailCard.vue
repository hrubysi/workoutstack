<template>
  <v-card
    class="WorkoutDetailCard"
    :loading="loading"
  >
    <template v-if="hideOnLoading">
      <v-card-title>Načítaní...</v-card-title>
    </template>
    <template v-else>
      <v-card-title class="flex-nowrap justify-space-between align-start">
        <template v-if="workout && !editable">
          <span>{{ workout.name }}</span>
          <div class="d-flex ml-5">
            <template v-if="ownedByUser">
              <ConfirmDialog @confirm="deleteWorkout">
                <template v-slot:default="{on}">
                  <v-btn
                    class="mr-3"
                    color="accent darken-4"
                    fab
                    small
                    :loading="loading"
                    v-on="on"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
                <template v-slot:text>
                  Opravdu chcete smazat cvičební plán <b>{{ workout.name }}</b>?
                </template>
              </ConfirmDialog>
              <v-btn
                class="mr-3"
                color="primary"
                dark
                fab
                small
                @click="editWorkout"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <!--            <v-btn-->
            <!--              color="accent"-->
            <!--              dark-->
            <!--              fab-->
            <!--              small-->
            <!--              @click="x = true"-->
            <!--            >-->
            <!--              <v-icon>mdi-play</v-icon>-->
            <!--            </v-btn>-->
          </div>
        </template>
        <template v-if="editable">
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
            :loading="loading"
            @click="cancelEdit"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-btn
            color="primary"
            dark
            fab
            small
            :loading="loading"
            @click="saveWorkout"
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </template>
      </v-card-title>
      <v-card-subtitle>
        <template v-if="workout && !editable">
          <div class="d-flex align-center mt-4">
            <div class="d-flex align-center mr-3">
              <v-icon class="mr-2">
                mdi-timer
              </v-icon>
              <span class="subtitle-2">{{ workout.rounds }} kol</span>
            </div>
            <div class="d-flex align-center mr-3">
              <v-icon class="mr-2">
                mdi-dumbbell
              </v-icon>
              <span class="subtitle-2">{{ workout.exercises.length }} cviků</span>
            </div>
            <div class="d-flex align-center">
              <v-icon class="mr-2">
                mdi-timer-sand
              </v-icon>
              <span class="subtitle-2">{{ workout.short_rest }}s / {{ workout.long_rest }}s</span>
            </div>
            <v-spacer />
            <v-chip
              v-for="tag in workout.tags"
              :key="`WorkoutDetail-Tag-${tag.id}`"
              class="mr-1 mb-1"
              color="primary"
              small
            >
              {{ tag.name }}
            </v-chip>
          </div>
        </template>
        <template v-if="editable">
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
                v-model="form.short_rest"
                prepend-inner-icon="mdi-timer-sand"
                type="number"
                label="Krátká pauza"
                hint="Mezi cviky"
                min="0"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="form.long_rest"
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
          <span
            v-if="!(form.exercises.length || editable)"
            class="pl-2 red--text text--darken-2"
          >Zatím neobsahuje žádné cviky.</span>
        </div>

        <div
          v-if="form.exercises.length || editable"
          class="WorkoutDetailCard__dropArea"
        >
          <v-expansion-panels>
            <draggable
              v-model="form.exercises"
              :disabled="!editable"
              v-bind="draggableOptions"
              style="width: 100%"
            >
              <WorkoutExercisePanel
                v-for="item in form.exercises"
                :key="`WorkoutItem-${item.id}`"
                :editable="editable"
                :exercise="item"
                :default-rest="form.short_rest"
                @exerciseInput="updateExercisePivot"
              />
            </draggable>
          </v-expansion-panels>
        </div>
      </v-card-text>
    </template>
  </v-card>
</template>

<script>
import { get, cloneDeep, isEqual } from 'lodash-es'
import { mapGetters, mapActions } from 'vuex'
import draggable from 'vuedraggable'
import WorkoutExercisePanel from './WorkoutExercisePanel'
import ConfirmDialog from './ConfirmDialog'

const defaultForm = {
  name: '',
  rounds: '',
  shortRest: '',
  longRest: '',
  tags: [],
  exercises: [],
}

export default {
  components: { ConfirmDialog, draggable, WorkoutExercisePanel },
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
      form: this.workout ? cloneDeep(this.workout) : cloneDeep(defaultForm),
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
      me: 'user/getMe',
      loading: 'workouts/isLoading',
    }),
    hideOnLoading() {
      return !this.editable && this.loading
    },
    ownedByUser() {
      return parseInt(this.me.id) === parseInt(this.workout.user_id)
    },
  },
  watch: {
    workout(value) {
      if (value) {
        this.form = cloneDeep(value)
      }
    },
  },
  methods: {
    ...mapActions({
      createWorkout: 'workouts/create',
      updateWorkout: 'workouts/update',
      removeWorkout: 'workouts/remove',
    }),
    saveWorkout() {
      if (this.workout && isEqual(this.form, this.workout)) {
        this.cancelEdit()
        return
      }

      const tags = this.form.tags.map(item => {
        return parseInt(get(item, 'id', item))
      })

      const workout = {
        id: get(this.form, 'id', null),
        name: this.form.name,
        rounds: this.form.rounds,
        short_rest: this.form.short_rest,
        long_rest: this.form.long_rest,
        tags,
        exercises: this.form.exercises.map(exercise => {
          return {
            id: exercise.id,
            mode: exercise.pivot.mode,
            amount: exercise.pivot.amount,
            rest: exercise.pivot.rest,
          }
        }),
      }

      if (this.create) {
        this.createWorkout({
          userId: this.me.id,
          workout,
          then: (id) => {
            this.$router.push({ name: 'workoutDetail', params: { id } })
          },
        })
      } else {
        this.updateWorkout({
          workout,
          then: () => {
            this.$router.push({ name: 'workoutDetail', params: { id: workout.id } })
          },
        })
      }
    },
    cancelEdit() {
      if (this.create) {
        this.$router.push({ name: 'workouts' })
      } else {
        this.$router.push({ name: 'workoutDetail', params: { id: this.workout.id } })
      }
    },
    editWorkout() {
      this.$router.push({ name: 'workoutEdit', params: { id: this.workout.id } })
    },
    updateExercisePivot({ id, pivot }) {
      this.form.exercises = this.form.exercises.map(item => {
        if (item.id === id) {
          item.pivot = pivot
        }

        return item
      })
    },
    deleteWorkout() {
      this.removeWorkout({
        id: this.workout.id,
        then: () => {
          this.$router.push({ name: 'workouts' })
        },
      })
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

  .v-card--loading {
    cursor: progress;

    * {
      pointer-events: none;
    }
  }
</style>
