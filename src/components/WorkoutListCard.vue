<template>
  <v-card
    class="WorkoutListCard"
    height="100%"
  >
    <router-link
      :to="{name: 'workoutDetail', params: {id: workout.id}}"
      class="WorkoutListCard__titleLink"
    >
      <v-card-title class="WorkoutListCard__title">
        {{ workout.name }}
      </v-card-title>
    </router-link>
    <v-card-text>
      <div class="d-flex align-center">
        <div class="d-flex align-center mr-3">
          <v-icon
            small
            class="mr-1"
          >
            mdi-timer
          </v-icon>
          <span class="subtitle-2">{{ workout.rounds }} kol</span>
        </div>
        <div class="d-flex align-center mr-3">
          <v-icon
            small
            class="mr-1"
          >
            mdi-dumbbell
          </v-icon>
          <span class="subtitle-2">{{ workout.exercises.length }} cviků</span>
        </div>
        <div class="d-flex align-center">
          <v-icon
            small
            class="mr-1"
          >
            mdi-timer-sand
          </v-icon>
          <span class="subtitle-2">30s / 60s</span>
        </div>
      </div>
      <div
        v-if="workout.tags.length"
        class="mt-4"
      >
        <v-chip
          v-for="tag in workout.tags"
          :key="`WorkoutList-Tag-${tag.id}`"
          class="mr-1 mb-1"
          color="primary"
          small
        >
          {{ tag.name }}
        </v-chip>
      </div>
    </v-card-text>
    <template v-if="workout.exercises.length">
      <v-divider />
      <v-card-actions>
        <v-expansion-panels
          flat
        >
          <v-expansion-panel>
            <v-expansion-panel-header>
              Cviky
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list
                dense
                rounded
              >
                <v-list-item
                  v-for="exercise in workout.exercises"
                  :key="`WorkoutList-Exercise-${exercise.id}`"
                  class="grey darken-4"
                >
                  <v-list-item-title>{{ exercise.name }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-actions>
    </template>
  </v-card>
</template>

<script>
export default {
  props: {
    workout: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss">
  .WorkoutListCard {
    a.WorkoutListCard__titleLink {
      border: 0;
      color: #fff;
      text-decoration: none;
    }

    .v-card__title {
      padding: 7px 16px 10px;
    }

    .v-card__text {
      padding: 0 16px 15px;
    }

    .v-expansion-panel-header {
      min-height: 0;
      padding: 2px 10px;
    }

    .v-expansion-panel--active > .v-expansion-panel-header {
      min-height: 0;
    }

    .v-expansion-panel-content__wrap {
      padding: 10px 10px 0;

      .v-list {
        padding: 0;

        .v-list-item {
          min-height: 0;
          padding: 3px 15px;
        }
      }
    }
  }
</style>
