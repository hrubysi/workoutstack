<template>
  <v-navigation-drawer
    :value="value"
    @input="onChange"
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
</template>

<script>
export default {
  props: {
    exercise: {
      type: Object,
      required: true,
    },
    value: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    onChange(value) {
      this.$emit('input', value)
    },
  },
}
</script>
