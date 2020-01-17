<template>
  <v-dialog
    v-model="modal"
    max-width="600px"
  >
    <template v-slot:activator="{ on }">
      <slot :on="on" />
    </template>
    <v-card :loading="loading">
      <v-card-text>
        <v-container>
          <v-tabs
            v-model="tab"
            align-with-title
            background-color="secondary"
            grow
            icons-and-text
          >
            <v-tabs-slider />
            <v-tab>
              Přihlášení
              <v-icon>mdi-account</v-icon>
            </v-tab>
            <v-tab>
              Registrace
              <v-icon>mdi-account-plus</v-icon>
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-form
                    ref="loginForm"
                    v-model="loginForm.valid"
                  >
                    <v-container>
                      <v-text-field
                        v-model="loginForm.fields.username"
                        label="E-mail"
                        prepend-icon="mdi-email-outline"
                        name="username"
                        type="text"
                        :rules="[rules.required, rules.email]"
                        required
                      />
                      <v-text-field
                        v-model="loginForm.fields.password"
                        name="password"
                        type="password"
                        label="Heslo"
                        prepend-icon="mdi-lock"
                        :rules="[rules.required]"
                        required
                      />
                      <p
                        class="mt-2 error--text"
                        v-text="loginForm.errorMessage"
                      />
                    </v-container>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="accent"
                    :loading="loading"
                    @click="submitLoginForm"
                  >
                    Přihlásit se
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-container>
                    <v-form
                      ref="registerForm"
                      v-model="registerForm.valid"
                    >
                      <v-text-field
                        v-model="registerForm.fields.email"
                        label="E-mail"
                        type="email"
                        prepend-icon="mdi-email-outline"
                        required
                        :rules="[rules.required, rules.email]"
                      />
                      <v-text-field
                        v-model="registerForm.fields.name"
                        label="Jméno"
                        prepend-icon="mdi-account"
                        required
                        :rules="[rules.required]"
                      />
                      <v-text-field
                        v-model="registerForm.fields.password"
                        type="password"
                        label="Heslo"
                        prepend-icon="mdi-lock"
                        required
                        :rules="[rules.required]"
                      />
                    </v-form>
                    <p
                      class="mt-2 error--text"
                      v-text="registerForm.errorMessage"
                    />
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="accent"
                    @click="submitRegisterForm"
                  >
                    Zaregistrovat se
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import { onLogin } from '@/plugins/apollo'
import validationRules from '@/mixins/validationRules'
export default {
  mixins: [validationRules],
  data() {
    return {
      loading: false,
      modal: false,
      loginForm: {
        errorMessage: '',
        fields: {
          username: 'test@test.cz',
          password: 'testerino',
        },
        valid: false,
      },
      registerForm: {
        fields: {
          email: null,
          name: null,
          password: null,
        },
        valid: false,
      },
      tab: null,
    }
  },
  methods: {
    ...mapActions({
      login: 'user/login',
      register: 'user/register',
    }),
    submitLoginForm() {
      if (this.$refs.loginForm.validate()) {
        this.loginForm.errorMessage = ''
        this.loading = true
        this.login({
          ...this.loginForm.fields,
          then: (data) => {
            this.loading = false
            if (!data) {
              this.loginForm.errorMessage = 'Zadané přihlašovací údaje jsou neplatné.'
            }
          },
        })
      }
    },
    submitRegisterForm() {
      if (this.$refs.registerForm.validate()) {
        this.registerForm.errorMessage = ''
        this.loading = true
        this.register({
          ...this.registerForm.fields,
          then: (data) => {
            this.loading = false
            if (!data) {
              this.registerForm.errorMessage = 'Tento účet již existuje.'
            }
          },
        })
      }
    },
  },
}
</script>

<style scoped>

</style>
