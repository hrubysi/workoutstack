<template>
  <v-app>
    <v-navigation-drawer
      app
      clipped
    >
      <v-list dense>
        <v-list-item-group>
          <v-list-item
            v-for="(item, i) in nav"
            :key="`NavItem-${i}`"
            :to="item.link"
          >
            <v-list-item-action>
              <v-icon>mdi-{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template v-if="adminNav.length">
        <v-divider />
        <v-list
          dense
        >
          <v-list-item-group>
            <v-list-item
              v-for="(item, i) in adminNav"
              :key="`nav-item-${i}`"
              :to="item.link"
            >
              <v-list-item-action>
                <v-icon>mdi-{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="item.title" />
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-toolbar-title>WorkoutStack</v-toolbar-title>
      <v-spacer />
      <template v-if="!isLogged">
        Nepřihlášen
        <AuthModal>
          <template v-slot="{ on }">
            <v-btn
              class="ml-5"
              fab
              small
              color="accent"
              :loading="isMeLoading"
              v-on="on"
            >
              <v-icon>
                mdi-account-plus
              </v-icon>
            </v-btn>
          </template>
        </AuthModal>
      </template>
      <template v-else>
        {{ me.name }}
        <v-menu
          offset-y
          nudge-bottom="5"
        >
          <v-list dense>
            <v-list-item>
              <v-list-item-content>
                <v-btn
                  @click="logout"
                >
                  Odhlásit se
                </v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <template v-slot:activator="{ on }">
            <v-btn
              class="ml-5"
              fab
              small
              color="primary"
              :loading="isMeLoading"
              v-on="on"
            >
              <v-icon>
                mdi-account
              </v-icon>
            </v-btn>
          </template>
        </v-menu>
      </template>
    </v-app-bar>

    <v-content>
      <v-container>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AuthModal from '@/components/AuthModal'
import AppSnackbar from '@/components/AppSnackbar'

export default {
  components: { AuthModal, AppSnackbar },
  data() {
    return {
      user: null,
      nav: [
        // {
        //   title: 'Přehled',
        //   icon: 'eye',
        //   link: '/',
        // },
        {
          title: 'Cviky',
          icon: 'dumbbell',
          link: '/exercises',
        },
        {
          title: 'Cvičební plány',
          icon: 'newspaper-variant-outline',
          link: '/workouts',
        },
      ],
      adminNav: [],
      // adminNav: [
      //   {
      //     title: 'Správa tagů',
      //     icon: 'tag',
      //     link: '/admin/tags',
      //   },
      // ],
    }
  },
  computed: {
    ...mapGetters({
      me: 'user/getMe',
      isMeLoading: 'user/isLoading',
    }),
    isLogged() {
      return !!this.me.id
    },
  },
  created() {
    this.fetchUser()
    this.fetchTags()
    this.fetchExercises()
    this.fetchWorkouts()
  },
  methods: {
    ...mapActions({
      logout: 'user/logout',
      fetchUser: 'user/fetchUser',
      fetchTags: 'tags/fetchTags',
      fetchExercises: 'exercises/fetchExercises',
      fetchWorkouts: 'workouts/fetchWorkouts',
    }),
  },
}
</script>
