export default {
  data() {
    return {
      rules: {
        required: v => !!v || 'Toto pole je povinné',
        email: v => /.+@.+\..+/.test(v) || 'E-mail není ve správném formátu',
      },
    }
  },
}
