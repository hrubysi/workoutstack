<template>
  <v-dialog
    v-model="modal"
    max-width="600px"
  >
    <template v-slot:activator="{ on }">
      <slot :on="on" />
    </template>
    <v-card>
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
          <v-tabs-items
            v-model="tab"
            class="pt-5"
          >
            <v-tab-item>
              <LoginForm />
            </v-tab-item>
            <v-tab-item>
              <RegisterForm/>
            </v-tab-item>
          </v-tabs-items>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
export default {
  components: { RegisterForm, LoginForm },
  data() {
    return {
      modal: false,
      tab: null,
    }
  },
}
</script>
