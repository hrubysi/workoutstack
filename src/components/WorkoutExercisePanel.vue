<template>
  <v-expansion-panel class="WorkoutExercisePanel">
    <v-expansion-panel-header
      color="grey darken-4"
      class="py-0"
      :expand-icon="editable ? 'mdi-pencil' : '$expand'"
      :disable-icon-rotate="editable"
    >
      <span
        class="flex-grow-1"
        :class="{'error--text': !hasAmount}"
      >
        {{ exercise.name }}
      </span>
      <div
        v-if="exercise.pivot"
        class="d-flex flex-grow-0 align-center ml-2 mr-10"
      >
        <template v-if="exercise.pivot.amount">
          <div
            v-if="exercise.pivot.mode === 0"
            class="headline font-weight-regular"
          >
            <span>{{ exercise.pivot.amount }}</span>
            <span class="title blue--text text--darken-3">x</span>
          </div>
          <div
            v-else
            class="d-flex align-center body-1"
          >
            <v-icon color="blue darken-3">
              mdi-clock
            </v-icon>
            <span
              class="ml-2"
              v-text="`${exercise.pivot.amount} s`"
            />
          </div>
        </template>
        <div
          v-if="restTimeOutput != null"
          class="d-flex align-center ml-4 body-1"
        >
          <v-icon color="blue darken-3">
            mdi-timer-sand
          </v-icon>
          <span
            class="ml-1"
            v-text="`${restTimeOutput} s`"
          />
        </div>
      </div>
    </v-expansion-panel-header>
    <v-expansion-panel-content color="grey darken-4">
      <template v-if="!editable">
        <v-card
          v-if="exercise.description"
          color="grey darken-3 mb-2"
          flat
        >
          <v-card-text class="py-2">
            {{ exercise.description }}
          </v-card-text>
        </v-card>
        <template v-if="exercise.youtube_id">
          <v-skeleton-loader
            v-if="!videoReady"
            type="image"
          />
          <div v-show="videoReady">
            <youtube
              :video-id="exercise.youtube_id"
              :fit-parent="true"
              class="mt-3"
              @ready="videoReady = true"
            />
          </div>
        </template>
      </template>
      <template v-else>
        <v-row>
          <v-col>
            <v-radio-group
              v-model="form.mode"
              hide-details=""
            >
              <div class="d-flex align-center">
                <span class="subtitle-1 mr-3">Typ:</span>
                <v-radio
                  on-icon="mdi-restore"
                  off-icon="mdi-restore"
                  class="ma-0 mr-3"
                  label="Opakování"
                />
                <v-radio
                  on-icon="mdi-clock"
                  off-icon="mdi-clock"
                  label="Čas"
                />
              </div>
            </v-radio-group>
          </v-col>
          <v-col>
            <v-switch
              v-model="enableCustomRestTime"
              label="Vlastní čas pauzy"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col md="6">
            <ValidationProvider
              v-slot="{ errors, failed }"
              :name="label"
              rules="required|numeric|minValue:1"
            >
              <v-text-field
                v-model="form.amount"
                :error="failed"
                :error-messages="errors[0]"
                :label="label"
                type="number"
                min="1"
              />
            </ValidationProvider>
          </v-col>
          <v-col
            v-if="enableCustomRestTime"
            md="6"
          >
            <ValidationProvider
              v-slot="{ errors, failed }"
              name="Čas pauzy"
              rules="required|numeric"
            >
              <v-text-field
                v-model="form.rest"
                :error="failed"
                :error-messages="errors[0]"
                type="number"
                label="Čas pauzy"
                min="0"
              />
            </ValidationProvider>
          </v-col>
        </v-row>
      </template>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { get } from 'lodash-es'

const defaultForm = {
  mode: 0,
  amount: 1,
  rest: 0,
}

export default {
  props: {
    editable: {
      type: Boolean,
      default: false,
    },
    exercise: {
      type: Object,
      required: true,
    },
    defaultRest: {
      type: [String, Number],
      default: 0,
    },
  },
  data() {
    return {
      enableCustomRestTime: false,
      videoReady: false,
      form: { ...defaultForm },
    }
  },
  computed: {
    restTime() {
      return this.enableCustomRestTime ? this.form.rest : null
    },
    restTimeOutput() {
      const restTime = this.enableCustomRestTime ? this.form.rest : this.defaultRest
      return Number.isInteger(parseInt(restTime)) ? restTime : null
    },
    label() {
      return this.form.mode ? 'Doba trvání (s)' : 'Počet opakování'
    },
    hasAmount() {
      return this.exercise.pivot ? Number.isInteger(parseInt(this.exercise.pivot.amount)) : true
    },
  },
  watch: {
    form: {
      deep: true,
      handler() {
        this.onChange()
      },
    },
    restTime() {
      this.onChange()
    },
  },
  methods: {
    onChange() {
      this.$emit('exerciseInput', {
        id: this.exercise.id,
        pivot: {
          ...this.form,
          rest: this.restTime,
        },
      })
    },
  },
}
</script>

<style>
  .WorkoutExercisePanel {
    .v-expansion-panel-content__wrap {
      padding-bottom: 10px;
    }
  }
</style>
