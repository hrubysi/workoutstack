<template>
  <v-container fluid>
    <ExerciseFilters/>
    <v-data-iterator
      :items="exercises"
      :search="search"
    >
      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="exercise in props.items"
            :key="exercise.id"
            cols="12"
            md="3"
          >
            <v-card>
              <v-card-title>
                {{ exercise.title }}
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
                    {{ tag }}
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
      exercises: [
        {
          id: 1,
          title: 'Lorem Ipsum Dolor Emit',
          tags: ['test', 'test2', 'test', 'test2', 'test', 'test2', 'test', 'test2'],
          description: 'Test content',
        },
        {
          id: 2,
          title: 'Test',
          tags: ['test', 'test2'],
          description: 'Test content',
        },

        {
          id: 3,
          title: 'Test',
          tags: ['test', 'test2'],
          description: 'Test content',
        },

        {
          title: 'Test',
          tags: ['test', 'test2'],
          description: 'Test content',
        },
        {
          id: 1,
          title: 'Lorem Ipsum Dolor Emit',
          tags: ['test', 'test2', 'test', 'test2', 'test', 'test2', 'test', 'test2'],
          description: 'Test content',
        },
        {
          id: 2,
          title: 'Test',
          tags: ['test', 'test2'],
          description: 'Test content',
        },

        {
          id: 3,
          title: 'Test',
          tags: ['test', 'test2'],
          description: 'Test content',
        },

        {
          title: 'Test',
          tags: ['test', 'test2'],
          description: 'Test content',
        },
      ],
    }
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
}
</script>
