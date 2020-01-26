<template>
  <v-container class="fill-height">
    <v-card
      flat
      width="100%"
      height="100%"
      :loading="loading"
    >
      <div class="py-3 px-2">
        <div v-if="edit || !exercise">
          <div class="d-flex justify-space-between align-center">
            <v-text-field
              v-model="form.name"
              class="headline"
              label="Název *"
            />
            <v-btn
              color="accent"
              class="ml-5"
              fab
              small
              :loading="loading"
              @click="cancelEdit"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-btn
              color="primary"
              class="ml-3"
              fab
              small
              :loading="loading"
              @click="saveExercise"
            >
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </div>

          <div class="mt-8">
            <v-autocomplete
              v-model="form.tags"
              :items="tags"
              item-text="name"
              item-value="id"
              chips
              dense
              small-chips
              multiple
              label="Tagy"
            />
            <v-text-field
              v-model="form.youtube_id"
              dense
              filled
              label="Youtube Video ID"
            />
            <v-textarea
              v-model="form.description"
              auto-grow
              filled
              no-resize
              label="Popis"
            />
          </div>
        </div>

        <div
          v-if="exercise"
          v-show="!edit"
          class="mt-3"
        >
          <div class="d-flex justify-space-between">
            <div class="headline">
              {{ exercise.name }}
            </div>
            <div v-if="editable">
              <v-dialog
                v-model="confirmDialog"
                max-width="300"
              >
                <template v-slot:activator="{ on }">
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
                <v-card>
                  <v-card-title>
                    Potvrzení akce
                  </v-card-title>
                  <v-card-text>Opravdu chcete smazat cvik <b>{{ exercise.name }}</b>?</v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      color="primary"
                      @click="confirmDialog = false"
                    >
                      Zrušit
                    </v-btn>
                    <v-btn
                      color="accent darken-4"
                      @click="onDelete"
                    >
                      Smazat
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-btn
                color="accent"
                fab
                small
                :loading="loading"
                @click="edit = true"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </div>
          </div>
          <div
            v-if="exercise.tags.length"
            class="mt-2"
          >
            <v-chip
              v-for="tag in exercise.tags"
              :key="tag.id"
              class="mr-1 my-1"
              color="primary"
              small
            >
              {{ tag.name }}
            </v-chip>
          </div>
          <v-card
            v-if="exercise.youtube_id"
            class="mt-2"
            color="grey darken-4"
            flat
          >
            <v-card-title>
              <div class="subtitle-2">
                Video
              </div>
            </v-card-title>
            <v-card-text>
              <v-skeleton-loader
                v-if="!videoReady"
                type="image"
              />
              <div v-show="videoReady">
                <youtube
                  :video-id="exercise.youtube_id"
                  :fit-parent="true"
                  @ready="videoReady = true"
                />
              </div>
            </v-card-text>
          </v-card>
          <v-card
            class="mt-4"
            color="grey darken-4"
            flat
          >
            <v-card-title>
              <div class="subtitle-2">
                Popis
              </div>
            </v-card-title>
            <v-card-text>
              {{ exercise.description }}
            </v-card-text>
          </v-card>
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<style lang="scss" scoped>
  .v-card--loading {
    cursor: progress;

    * {
      pointer-events: none;
    }
  }
</style>

<script>
import { isEqual, get } from 'lodash-es'
import { mapGetters, mapActions } from 'vuex'

const defaultForm = {
  description: '',
  tags: [],
  name: '',
  youtube_id: '',
}

export default {
  props: {
    exercise: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      confirmDialog: false,
      edit: false,
      form: this.exercise ? { ...this.exercise } : { ...defaultForm },
      videoReady: false,
    }
  },
  computed: {
    ...mapGetters({
      me: 'user/getMe',
      tags: 'tags/getAll',
      loading: 'exercises/isLoading',
    }),
    editable() {
      return this.exercise && this.exercise.user_id.toString() === this.me.id
    },
  },
  methods: {
    ...mapActions({
      createExercise: 'exercises/create',
      removeExercise: 'exercises/remove',
      updateExercise: 'exercises/update',
    }),
    cancelEdit() {
      this.edit = false
      if (this.exercise) {
        this.form = { ...this.exercise }
      } else {
        this.closeDrawer()
      }
    },
    closeDrawer() {
      this.$emit('close')
    },
    onDelete() {
      this.removeExercise({
        id: this.exercise.id,
        then: () => {
          this.closeDrawer()
        },
      })
    },
    saveExercise() {
      if (isEqual(this.exercise, this.form)) {
        this.cancelEdit()
        return
      }

      const exercise = { ...this.form }
      exercise.tags = exercise.tags.map(item => {
        return parseInt(get(item, 'id', item))
      })

      if (this.exercise) {
        this.updateExercise({
          exercise,
          then: () => {
            this.videoReady = false
            this.cancelEdit()
          },
        })
      } else {
        this.createExercise({
          exercise,
          userId: this.me.id,
          then: () => {
            this.closeDrawer()
          },
        })
      }
    },
  },
}
</script>
