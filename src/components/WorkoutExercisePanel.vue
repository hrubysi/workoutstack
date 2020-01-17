<template>
  <v-expansion-panel>
    <v-expansion-panel-header
      color="grey darken-4"
      :expand-icon="editable ? 'mdi-pencil' : '$expand'"
      :disable-icon-rotate="editable"
    >
      {{ exercise.name }}
      <div class="d-flex align-center ml-5">
        <div
          v-if="exercise.amount"
          class="headline font-weight-regular"
        >
          5<span
            class="title blue--text text--darken-3"
            style="margin-left: 1px"
          >x</span>
        </div>
        <div
          v-if="exercise.rest"
          class="d-flex align-center ml-5 body-1"
        >
          <v-icon color="blue darken-3">
            mdi-timer-sand
          </v-icon>
          <span>60s</span>
        </div>
      </div>
    </v-expansion-panel-header>
    <v-expansion-panel-content color="grey darken-4">
      <template v-if="!editable">
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin mattis lacinia justo. Pellentesque sapien. Pellentesque arcu.
          <br>Suspendisse sagittis ultrices augue. Etiam quis quam. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor. Donec quis nibh at felis congue commodo.
        </p>
        <youtube
          v-card-text
          class="mt-3"
          :video-id="'r9xUofg0B04'"
          player-width="100%"
        />
      </template>
      <template v-else>
        <v-row>
          <v-col>
            <v-radio-group
              :value="0"
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
        </v-row>
        <v-row>
          <v-col>
            <v-switch label="Vlastní čas pauzy" />
          </v-col>
          <v-col>
            <v-text-field
              type="number"
              label="Počet opakování"
            />
          </v-col>
        </v-row>
      </template>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  props: {
    editable: {
      type: Boolean,
      default: false,
    },
    exercise: {
      type: Object,
      required: true,
      default: () => ({ name: 'Jumping PushUps' }),
    },
  },
}
</script>

<style scoped>

</style>
