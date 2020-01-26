<template>
  <div>
    <v-divider class="my-5" />
    <div class="d-flex flex-row align-center justify-space-between">
      <div class="mr-5">
        {{ itemsFrom }} - {{ itemsTo }} ze {{ totalItems }}
      </div>
      <div>
        <v-btn
          class="mr-3"
          min-width="0"
          max-width="35"
          height="35"
          :disabled="isPrevDisabled"
          @click="prevPage"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn
          v-for="i in navItems"
          :key="`Pagination-item-${i}`"
          :color="startItem + i === value ? 'primary' : 'secondary lighten-1'"
          class="mr-1"
          min-width="35"
          height="35"
          @click="change(startItem + i)"
        >
          {{ startItem + i }}
        </v-btn>
        <template v-if="showLastItem">
          <span class="px-3">...</span>
          <v-btn
            class="mr-1"
            color="secondary lighten-1"
            min-width="35"
            height="35"
            @click="change(pages)"
          >
            {{ pages }}
          </v-btn>
        </template>
        <v-btn
          class="ml-2"
          min-width="0"
          max-width="35"
          height="35"
          :disabled="isNextDisabled"
          @click="nextPage"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    perPage: {
      type: Number,
      default: 12,
    },
    navLimit: {
      type: Number,
      default: 4,
    },
    value: {
      type: Number,
      required: true,
    },
    totalItems: {
      type: Number,
      required: true,
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.totalItems / this.perPage)
    },
    navItems() {
      let navItems = this.navLimit
      if (this.showLastItem) {
        navItems--
      }

      if (this.pages < navItems) {
        navItems = this.pages
      }

      return navItems
    },
    showLastItem() {
      const showLastItem = this.pages - this.value > 1
      return this.navLimit < this.pages ? showLastItem : false
    },
    startItem() {
      let startItem = (this.value >= this.navLimit ? ((this.value + 1) - this.navLimit) : 0)
      if (this.navLimit <= this.pages && startItem + this.navLimit > this.pages) {
        startItem = this.pages - this.navLimit
      }
      return startItem
    },
    itemsFrom() {
      return (this.value - 1) * this.perPage + 1
    },
    itemsTo() {
      const to = this.itemsFrom + this.perPage - 1
      return to > this.totalItems ? this.totalItems : to
    },
    isPrevDisabled() {
      return this.value === 1
    },
    isNextDisabled() {
      return this.value === this.pages
    },
  },
  methods: {
    nextPage() {
      this.change(this.value + 1)
    },
    prevPage() {
      this.change(this.value - 1)
    },
    change(to) {
      if (to < 1) {
        to = 1
      } else if (to > this.pages) {
        to = this.pages
      }

      this.$emit('input', to)
    },
  },
}
</script>
