<template>
  <div class="d-flex flex-grow-1">
    <v-col
      md="6"
      class="pa-0"
    >
      <v-autocomplete
        v-model="local.value.tags"
        :items="tags"
        item-text="name"
        item-value="id"
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
        no-data-text="Žádné tagy"
        class="mr-5"
        @input="onChange"
      />
    </v-col>
    <v-col
      md="6"
      class="pa-0"
    >
      <v-text-field
        v-model="local.value.search"
        placeholder="Vyhledávání"
        prepend-icon="mdi-magnify"
        filled
        dense
        clearable
        @input="onChange"
      />
    </v-col>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      local: {
        value: {
          search: this.value.search,
          tags: this.value.tags,
        },
      },
    }
  },
  computed: {
    ...mapGetters({
      tags: 'tags/getAll',
    }),
  },
  methods: {
    onChange() {
      this.$emit('input', this.local.value)
    },
  },
}
</script>
