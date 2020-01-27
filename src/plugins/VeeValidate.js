import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend, localize } from 'vee-validate'
import { required, email, min, alpha_spaces as alphaSpace, alpha, numeric } from 'vee-validate/dist/rules'
import cs from 'vee-validate/dist/locale/cs'

localize('cs', cs)
extend('required', required)
extend('email', email)
extend('min', min)
extend('alpha', alpha)
extend('alphaSpaces', alphaSpace)
extend('numeric', numeric)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
