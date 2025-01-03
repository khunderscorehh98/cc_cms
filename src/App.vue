<template>
  <v-app class="montserrat-body">
    <div v-if="userLoggedIn == false">
      <UserAccess @loginSuccess="userLoggedIn = true" />
    </div>
    <div v-if="userLoggedIn == true">
      <v-app-bar app color="primary" dark>
        <v-toolbar-title class="montserrat-header">Dashboard</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text>Logout</v-btn>
      </v-app-bar>

      <v-main>
        <v-container fluid>
          <v-row no-gutters>
            <!-- Sidebar for Desktop -->
            <v-col cols="3" class="d-none d-sm-block">
              <Sidebar />
            </v-col>
          </v-row>
        </v-container>

        <v-container>
          <router-view />
        </v-container>
      </v-main>

      <!-- Mobile Button to Toggle Sidebar -->
      <ButtonPup @toggleSidebar="toggleSidebar" />

      <!-- Sidebar for Mobile (Temporary Drawer) -->
      <v-navigation-drawer
        v-model="sidebarVisible"
        app
        temporary
        overlay
        right
        class="d-sm-none"
        :clipped="sidebarVisible"
        color="white"
        width="250"
      >
        <!-- Sidebar Menu Content -->
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <strong>CareerConnect</strong>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <!-- Menu Items with Dropdowns -->
          <v-list-item @click="toggleDropdown('dashboard')">
            <v-list-item-content>
              <v-btn block text>
                Dashboard
              </v-btn>
            </v-list-item-content>
          </v-list-item>

          <transition name="fade">
            <v-list v-if="dropdowns.dashboard" dense>
              <v-list-item>
                <v-btn block text to="/">
                  Dashboard
                </v-btn>
              </v-list-item>
            </v-list>
          </transition>

          <v-list-item @click="toggleDropdown('jobSeekers')">
            <v-list-item-content>
              <v-btn block text>
                Job Seekers
              </v-btn>
            </v-list-item-content>
          </v-list-item>

          <transition name="fade">
            <v-list v-if="dropdowns.jobSeekers" dense>
              <v-list-item>
                <v-btn block text to="/JobSeekers/">
                  All List
                </v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn block text to="/job-seekers/deleted">
                  Deleted
                </v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn block text to="/job-seekers/archived">
                  Archived
                </v-btn>
              </v-list-item>
            </v-list>
          </transition>

          <v-list-item @click="toggleDropdown('employers')">
            <v-list-item-content>
              <v-btn block text>
                Employers
              </v-btn>
            </v-list-item-content>
          </v-list-item>

          <transition name="fade">
            <v-list v-if="dropdowns.employers" dense>
              <v-list-item>
                <v-btn block text to="/employers/">
                  All List
                </v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn block text to="/employers/archived">
                  Archived
                </v-btn>
              </v-list-item>
            </v-list>
          </transition>

          <v-list-item>
            <v-list-item-content>
              <v-btn block text to="/trainings">
                Trainings
              </v-btn>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-btn block text to="/users">
                User Management
              </v-btn>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-btn block text to="/Announcement">
                Announcement
              </v-btn>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>
    <!-- Header -->
  </v-app>
</template>

<script>
import Sidebar from '@/components/sidebar.vue'; // Ensure the path is correct
import UserAccess from './components/useraccess.vue';
import ButtonPup from './components/ButtonPup.vue';

export default {
  components: {
    Sidebar,
    UserAccess,
    ButtonPup
  },
  data() {
    return {
      userLoggedIn: true, // Example: Simulating user login status
      fetchedData: null,  // Variable to store API data
      sidebarVisible: false, // Track the sidebar visibility on mobile
      dropdowns: {
        dashboard: false,
        jobSeekers: false,
        employers: false
      }, // Tracking dropdown states
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },
    toggleDropdown(type) {
      this.dropdowns[type] = !this.dropdowns[type];
    }
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

.montserrat-header {
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-weight: 700;
  font-style: normal;
}

.montserrat-body {
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

.v-container,
.v-col {
  margin: 0;
  padding: 0;
}

.v-navigation-drawer {
  background-color: white !important; /* White background */
}

.v-navigation-drawer--app {
  display: block;
  z-index: 10;
}

.v-navigation-drawer--mobile {
  display: block !important;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
