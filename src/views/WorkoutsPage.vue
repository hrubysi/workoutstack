<template>
  <v-container fluid>
    <div class="d-flex justify-space-between">
      <h1 class="headline">
        Cvičební plány
      </h1>
      <ExerciseFilters
        v-model="filters"
        class="px-10"
      />
      <v-btn
        color="accent"
        dark
        fab
        small
        :to="{name: 'createWorkout'}"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <ItemsIterator
      :filters="filters"
      :items="workouts"
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
        <p>Nebyly nalezeny žádné cvičební plány.</p>
      </template>
      <template v-slot:default="{ items }">
        <v-row>
          <v-col
            v-for="workout in items"
            :key="`WorkoutItem-${workout.id}`"
            cols="12"
            md="3"
          >
            <WorkoutListCard :workout="workout" />
          </v-col>
        </v-row>
      </template>
    </ItemsIterator>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ExerciseFilters from '@/components/ExerciseFilters'
import ItemsIterator from '@/components/ItemsIterator'
import WorkoutListCard from '@/components/WorkoutListCard'
import filterMixin from '@/mixins/filterMixin'

export default {
  components: { ExerciseFilters, WorkoutListCard, ItemsIterator },
  mixins: [filterMixin],
  computed: {
    ...mapGetters({
      loading: 'workouts/isLoading',
      workouts: 'workouts/getAll',
    }),
  },
}
</script>
