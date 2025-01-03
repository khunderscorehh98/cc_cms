<template>
    <v-navigation-drawer app>
      <v-list>
        <!-- Title -->
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="montserrat-body">
              <strong>CareerConnect</strong>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
  
        <v-divider></v-divider>
  
        <!-- Dashboard Button -->
        <v-list-item>
          <v-list-item-content>
            <v-btn block text router-link to="/">
              Dashboard
            </v-btn>
          </v-list-item-content>
        </v-list-item>
  
        <v-divider></v-divider>
  
        <!-- Custom Dropdown for Job Seekers -->
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
              <v-btn block text to="/job-seekers/archived">
                Archived
              </v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn block text to="/job-seekers/deleted">
                Deleted
              </v-btn>
            </v-list-item>
          </v-list>
        </transition>
  
        <v-divider></v-divider>
  
        <!-- Custom Dropdown for Employers -->
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
            <v-list-item>
              <v-btn block text to="/employers/deleted">
                Deleted
              </v-btn>
            </v-list-item>
          </v-list>
        </transition>

        <v-divider></v-divider>

        <!-- User Management Button -->
        <v-list-item>
          <v-list-item-content>
            <v-btn block text router-link to="/trainings">
              Trainings
            </v-btn>
          </v-list-item-content>
        </v-list-item>
  
        <v-divider></v-divider>
        <!-- User Management Button -->
        <v-list-item>
          <v-list-item-content>
            <v-btn block text router-link to="/users">
              User Mangement
            </v-btn>
          </v-list-item-content>
        </v-list-item>
  
        <v-divider></v-divider>

        <!-- Announcement Button -->
        <v-list-item>
          <v-list-item-content>
            <v-btn block text router-link to="/Announcement">
              Announcement
            </v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dropdowns: {
          jobSeekers: false,
          employers: false
        }
      };
    },
    methods: {
      toggleDropdown(type) {
        this.dropdowns[type] = !this.dropdowns[type];
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
.v-navigation-drawer {
  width: 250px;
}
.montserrat-body {
  font-family: 'Montserrat', sans-serif;
}
.v-btn {
  margin-bottom: 10px;
  outline: none !important;
  box-shadow: none !important;
}

.v-btn:focus, .v-btn:active {
  outline: none !important;
  box-shadow: none !important;
}
.v-btn--active, .v-btn:focus-visible {
  outline: none !important;
  box-shadow: none !important;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>


  