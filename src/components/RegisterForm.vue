<template>
  <v-card flat>
    <ValidationObserver v-slot="{ handleSubmit, failed }">
      <v-form @submit.prevent="handleSubmit(onSubmit)">
        <v-container>
          <ValidationProvider
            v-slot="{ errors, failed }"
            name="E-mail"
            rules="required|email"
          >
            <v-text-field
              v-model="form.email"
              :error="failed"
              :error-messages="errors[0]"
              :loading="loading"
              label="E-mail"
              prepend-icon="mdi-email-outline"
              name="username"
              type="text"
              required
            />
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors, failed }"
            name="Jméno"
            rules="required|alpha|min:3"
          >
            <v-text-field
              v-model="form.name"
              :error="failed"
              :error-messages="errors[0]"
              :loading="loading"
              label="Jméno"
              prepend-icon="mdi-account"
              name="username"
              type="text"
              required
            />
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors, failed }"
            name="Heslo"
            rules="required|min:8"
          >
            <v-text-field
              v-model="form.password"
              :error="failed"
              :error-messages="errors[0]"
              :loading="loading"
              name="password"
              type="password"
              label="Heslo"
              prepend-icon="mdi-lock"
              required
            />
          </ValidationProvider>
        </v-container>
        <v-card-actions class="align-center justify-space-between">
          <div>
            <span
              v-if="errorMessage"
              class="error--text"
              v-text="errorMessage"
            />
          </div>
          <v-btn
            :disabled="failed"
            :loading="loading"
            color="primary"
            type="submit"
          >
            Zaregistrovat
          </v-btn>
        </v-card-actions>
      </v-form>
    </ValidationObserver>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      errorMessage: '',
      form: {
        email: '',
        name: '',
        password: '',
      },
    }
  },
  computed: {
    ...mapGetters({
      loading: 'user/isLoading',
    }),
  },
  methods: {
    ...mapActions({
      register: 'user/register',
    }),
    onSubmit() {
      this.register({
        ...this.form,
        then: (passed) => {
          if (!passed) {
            this.errorMessage = 'Tento účet již existuje.'
          }
        },
      })
    },
  },
}
</script>
