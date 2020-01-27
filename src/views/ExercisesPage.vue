<template>
  <v-container fluid>
    <div class="d-flex justify-space-between">
      <h1 class="headline">
        Cviky
      </h1>
      <ExerciseFilters
        v-model="filters"
        class="px-10"
      />
      <v-btn
        v-if="isLoggedIn"
        color="accent"
        dark
        fab
        small
        :to="{name: 'createExercise'}"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <ItemsIterator
      :filters="filters"
      :items="exercises"
      :loading="loading"
    >
      <template v-slot:loading>
        <v-row>
          <v-col
            v-for="i in 4"
            :key="`placeholder-${i}`"
            cols="12"
            md="3"
          >
            <v-skeleton-loader type="image" />
          </v-col>
        </v-row>
      </template>
      <template v-slot:empty>
        <p>Nebyly nalezeny žádné cviky.</p>
      </template>
      <template v-slot:default="{ items }">
        <v-row>
          <v-col
            v-for="exercise in items"
            :key="exercise.id"
            cols="12"
            md="3"
          >
            <v-card
              :to="{name: 'exerciseDetail', params: {id: exercise.id}}"
              height="100%"
              hover
            >
              <v-card-title>
                {{ exercise.name }}
              </v-card-title>
              <v-card-text>
                <div>
                  <v-chip
                    v-for="(tag, i) in exercise.tags"
                    :key="i"
                    class="mr-1 mb-1"
                    color="primary"
                    small
                  >
                    {{ tag.name }}
                  </v-chip>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </ItemsIterator>

    <v-navigation-drawer
      :value="exerciseDrawer"
      right
      fixed
      width="500px"
      temporary
      @input="onDrawerChange"
    >
      <ExerciseDrawer
        v-if="exerciseDrawer"
        :exercise="activeExercise"
        @close="onDrawerChange(false)"
      />
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ExerciseDrawer from '@/components/ExerciseDrawer'
import ItemsIterator from '@/components/ItemsIterator'
import ExerciseFilters from '@/components/ExerciseFilters'

export default {
  components: { ExerciseFilters, ItemsIterator, ExerciseDrawer },
  props: {
    create: {
      type: Boolean,
      default: false,
    },
    detail: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      exerciseDrawer: this.create,
      filters: {
        search: '',
        tags: [],
      },
    }
  },
  computed: {
    ...mapGetters({
      findExercise: 'exercises/find',
      exercises: 'exercises/getAll',
      tags: 'tags/getAll',
      loading: 'exercises/isLoading',
      isLoggedIn: 'user/isLoggedIn',
    }),
    activeExercise() {
      if (this.exercises && this.$route.params.id) {
        return this.findExercise(this.$route.params.id)
      }

      return null
    },
    computedDrawer() {
      return !!this.activeExercise || this.create
    },
  },
  watch: {
    computedDrawer(value) {
      this.exerciseDrawer = value
    },
  },
  methods: {
    onDrawerChange(value) {
      if (!value && (this.create || this.detail)) {
        this.$router.push({ name: 'exercises' })
      }
    },
  },
}
</script>
