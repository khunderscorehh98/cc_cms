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
            <!-- Sidebar -->
            <v-col cols="3">
              <Sidebar />
            </v-col>
          </v-row>
        </v-container>

        <v-container>
          <router-view />
        </v-container>
      </v-main>
    </div>
    <!-- Header -->
  </v-app>
</template>

<script>
import Sidebar from '@/components/sidebar.vue'; // Ensure the path is correct
import UserAccess from './components/useraccess.vue';

export default {
  components: {
    Sidebar,
    UserAccess
  },
  data() {
    return {
      userLoggedIn: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

.montserrat-header {
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-weight: 700;
  /* You can replace this with any value between 100 to 900 */
  font-style: normal;
}

.montserrat-body {
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  /* Regular weight for body text */
  font-style: normal;
}

.v-container,
.v-col {
  margin: 0;
  padding: 0;
}
</style>
