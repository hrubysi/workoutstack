<template>
  <div>
    <template v-if="loading">
      <slot name="loading" />
    </template>
    <template v-else>
      <slot
        v-if="paginatedItems.length"
        :items="paginatedItems"
      />
      <slot
        v-else
        name="empty"
      />
    </template>
    <AppPagination
      v-if="paginatedItems.length"
      v-model="page"
      :per-page="perPage"
      :total-items="filteredItems.length"
    />
  </div>
</template>

<script>
import { escapeRegExp } from 'lodash-es'
import AppPagination from '@/components/AppPagination'

export default {
  components: { AppPagination },
  props: {
    filters: {
      type: Object,
      default: () => ({
        search: '',
        tags: [],
      }),
    },
    loading: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      page: 1,
      perPage: 12,
    }
  },
  computed: {
    filteredItems() {
      const filters = this.filters
      return this.items
        .filter(item => {
          const search = item.name.match(new RegExp(escapeRegExp(filters.search), 'i'))

          let tags = true
          if (filters.tags.length) {
            tags = !!item.tags.length && item.tags.some(tag => filters.tags.includes(tag.id))
          }

          return search && tags
        })
    },
    paginatedItems() {
      const from = (this.page - 1) * this.perPage
      const to = from + this.perPage
      return this.filteredItems.slice(from, to)
    },
  },
}
</script>
