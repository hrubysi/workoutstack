<template>
  <v-card :loading="loading">
    <v-card-title>Dostupné cviky</v-card-title>
    <v-card-subtitle class="mt-0">
      <ExerciseFilters v-model="filters" />
    </v-card-subtitle>
    <v-card-text>
      <ItemsIterator
        :items="exercises"
        :filters="filters"
      >
        <template v-slot:default="{ items }">
          <v-expansion-panels>
            <draggable
              :list="items"
              v-bind="draggableOptions"
              style="width: 100%"
              :sort="false"
              :clone="handleClone"
              @change="draggableChange"
            >
              <WorkoutExercisePanel
                v-for="item in items"
                :key="`AddExercise-${item.id}`"
                :exercise="item"
              />
            </draggable>
          </v-expansion-panels>
        </template>
      </ItemsIterator>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import draggable from 'vuedraggable'
import WorkoutExercisePanel from './WorkoutExercisePanel'
import ItemsIterator from './ItemsIterator'
import ExerciseFilters from './ExerciseFilters'
import filterMixin from '@/mixins/filterMixin'

export default {
  components: { ExerciseFilters, ItemsIterator, draggable, WorkoutExercisePanel },
  mixins: [filterMixin],
  data() {
    return {
      test: 0,
      draggableOptions: {
        group: {
          name: 'workoutExercises',
          pull: 'clone',
        },
      },
    }
  },
  computed: {
    ...mapGetters({
      loading: 'exercises/isLoading',
      exercises: 'exercises/getAll',
    }),
  },
  methods: {
    handleClone(item) {
      return {
        ...item,
        pivot: {
          mode: 0,
          amount: 1,
          rest: 0,
        },
      }
    },
    draggableChange({ added }) {
      // this.items.splice(added.newIndex, 1)
    },
  },
}
</script>

<style scoped>

</style>
