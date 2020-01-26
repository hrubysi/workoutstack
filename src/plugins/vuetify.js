import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'
import cs from 'vuetify/es5/locale/cs'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: colors.blue.accent3,
      },
    },
  },
  lang: {
    locales: { cs },
    current: 'cs',
  },
})
