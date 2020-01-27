import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend, localize } from 'vee-validate'
import { required, email, min, alpha_spaces as alphaSpaces, alpha, numeric, alpha_num as alphaNum, min_value as minValue } from 'vee-validate/dist/rules'
import cs from 'vee-validate/dist/locale/cs'

localize('cs', cs)
extend('required', required)
extend('email', email)
extend('min', min)
extend('alpha', alpha)
extend('alphaSpaces', alphaSpaces)
extend('numeric', numeric)

extend('minValue', {
  ...minValue,
  message: '{_field_} musí být alespoň {min}.',
})

extend('alphaNum', {
  ...alphaNum,
  message: '{_field_} může obsahovat pouze písmena a číslice.',

})

extend('noTags', {
  message: '{_field_} nesmí obsahovat tagy.',
  validate: value => {
    return !value.match(/<[^>]*>/)
  },
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
