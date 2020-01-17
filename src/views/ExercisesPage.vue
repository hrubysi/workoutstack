<template>
  <v-container fluid>
    <ExerciseFilters/>
    <v-data-iterator
      :items="exercises"
      :loading="loading"
    >
      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="exercise in props.items"
            :key="exercise.id"
            cols="12"
            md="3"
          >
            <v-card :to="{name: 'editExercise', params: {id: exercise.id}}">
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
    </v-data-iterator>

    <v-btn
      bottom
      color="accent"
      dark
      fab
      fixed
      right
      :to="{name: 'createExercise'}"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <ExerciseDrawer v-model="exerciseDrawer"/>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ExerciseFilters from '@/components/ExerciseFilters'
import ExerciseDrawer from '@/components/ExerciseDrawer'

export default {
  components: { ExerciseDrawer, ExerciseFilters },
  props: {
    create: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      search: '',
      itemsPerPageArray: [4, 8, 12],
      page: 1,
      itemsPerPage: 4,
      exerciseDrawer: this.create,
      tagFilter: null,
      tags: ['Test1', 'Test2', 'Abs'],
    }
  },
  computed: {
    ...mapGetters({
      exercises: 'exercises/getAll',
      loading: 'exercises/isLoading',
    }),
  },
  methods: {
    ...mapActions({
      fetchExercises: 'exercises/fetchExercises',
    }),
  },
  watch: {
    create(newValue) {
      this.exerciseDrawer = newValue
    },
    exerciseDrawer(newValue) {
      if (this.create && !newValue) {
        this.$router.push({ name: 'exercises' })
      }
    },
  },
  mounted() {
    this.fetchExercises()
  },
}
</script>
