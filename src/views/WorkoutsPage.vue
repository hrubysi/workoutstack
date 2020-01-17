<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-autocomplete
          v-model="tagFilter"
          :items="tags"
          chips
          small-chips
          multiple
          deletable-chips
          filled
          prepend-icon="mdi-filter"
          clearable
          dense
          hide-selected
          placeholder="Filtrování dle tagů"
        />
      </v-col>
      <v-col>
        <v-text-field
          v-model="search"
          placeholder="Vyhledávání"
          prepend-icon="mdi-magnify"
          filled
          dense
          clearable
        />
      </v-col>
    </v-row>

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
                <div class="d-flex align-center">
                  <div class="d-flex align-center mr-3">
                    <v-icon class="mr-2">
                      mdi-timer
                    </v-icon>
                    <span class="subtitle-2">5 kol</span>
                  </div>
                  <div class="d-flex align-center mr-3">
                    <v-icon class="mr-2">
                      mdi-dumbbell
                    </v-icon>
                    <span class="subtitle-2">8 cviků</span>
                  </div>
                  <div class="d-flex align-center">
                    <v-icon class="mr-2">
                      mdi-timer
                    </v-icon>
                    <span class="subtitle-2">5 kol</span>
                  </div>
                </div>
                <div class="mt-4">
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
                      >
                        <v-list-item>
                          <v-list-item-title>Test</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card-actions>
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
      @click="x = true"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-navigation-drawer
      v-model="x"
      right
      fixed
      width="500px"
      temporary
    >
      <v-container>
        <div class="px-2">
          <div v-if="true">
            <div class="d-flex justify-space-between align-center">
              <v-text-field
                class="headline"
                label="Název"
              />
              <v-btn
                color="primary"
                class="ml-5"
                fab
                small
              >
                <v-icon>mdi-check</v-icon>
              </v-btn>
            </div>

            <div class="mt-8">
              <v-autocomplete
                chips
                dense
                filled
                small-chips
                label="Tagy"
              />
              <v-text-field
                dense
                filled
                label="Youtube Video ID"
              />
              <v-textarea
                auto-grow
                filled
                no-resize
                label="Popis"
              />
            </div>
          </div>

          <div v-if="false">
            <div class="d-flex justify-space-between">
              <div class="headline">
                Lorem ipsum
              </div>
              <v-btn
                color="accent"
                fab
                small
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </div>
            <div class="mt-2">
              <v-chip
                v-for="(tag, i) in tags"
                :key="i"
                class="mr-1 my-1"
                color="primary"
                small
              >
                {{ tag }}
              </v-chip>
            </div>
            <v-card
              flat
              class="mt-2"
            >
              <v-card-title>
                <div class="subtitle-2">
                  Video
                </div>
              </v-card-title>
              <v-card-text>
                <youtube
                  v-card-text
                  :video-id="'r9xUofg0B04'"
                  player-width="100%"
                  player-height="300px"
                />
              </v-card-text>
            </v-card>
            <v-card
              flat
            >
              <v-card-title>
                <div class="subtitle-2">
                  Popis
                </div>
              </v-card-title>
              <v-card-text>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin mattis lacinia justo. Pellentesque sapien. Pellentesque arcu.
                <br>Suspendisse sagittis ultrices augue. Etiam quis quam. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor. Donec quis nibh at felis congue commodo.
              </v-card-text>
            </v-card>
          </div>
        </div>
      </v-container>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      itemsPerPageArray: [4, 8, 12],
      page: 1,
      itemsPerPage: 4,
      x: false,
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
}
</script>
