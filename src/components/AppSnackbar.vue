<template>
  <v-snackbar
    v-model="snackbar"
    :color="snackType"
    :timeout="3000"
    top
  >
    {{ snack }}
    <v-btn
      text
      @click="snackbar = false"
    >
      Zavřít
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: 'AppSnackbar',
  data() {
    return {
      snackbar: false,
      snackType: '',
      snack: '',
    }
  },
  // computed: {
  //   ...mapGetters({
  //     snack: 'snackbar/getSnack',
  //     snackType: 'snackbar/getSnackType',
  //   }),
  // },
  // watch: {
  //   snackbar(value) {
  //     if (!value) {
  //       this.clearSnack()
  //     }
  //   },
  //   snack(value) {
  //     if (value) {
  //       this.snackbar = true
  //     }
  //   },
  // },
  // methods: {
  //   ...mapMutations({
  //     clearSnack: 'snackbar/CLEAR_SNACK',
  //   }),
  // },
}
</script>

<style scoped>

</style>
