<template>
  <v-dialog
    v-model="confirmDialog"
    max-width="300"
  >
    <template v-slot:activator="{ on }">
      <slot :on="on" />
    </template>
    <v-card>
      <v-card-title>
        Potvrzení akce
      </v-card-title>
      <v-card-text>
        <slot name="text"/>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          @click="confirmDialog = false"
        >
          Zrušit
        </v-btn>
        <v-btn
          color="accent darken-4"
          @click="onConfirm"
        >
          Potvrdit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      confirmDialog: false,
    }
  },
  methods: {
    onConfirm() {
      this.$emit('confirm')
    },
  },
}
</script>

<style scoped>

</style>
