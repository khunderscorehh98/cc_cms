<template>
  <v-container fluid class="activity-logs-container pa-0 ma-0">
    <v-row class="pa-2">
      <!-- Notifications Header -->
      <v-col cols="9">
        <span class="text-h6 text-sm-h3"><strong>Notifications</strong></span>
      </v-col>

      <!-- Buttons Section -->
      <v-col cols="3" class="d-none d-sm-flex justify-end">
        <!-- Buttons with proper spacing -->
        <v-btn class="mr-2" @click="openDeletedModal">Deleted</v-btn>
        <v-btn>Archived</v-btn>
      </v-col>

      <v-col cols="12">
        <hr />
      </v-col>

      <!-- Check if activityLogs is empty -->
      <v-col cols="12" v-if="filteredLogs.length === 0" class="text-center">
        <p>No activity logs available.</p>
      </v-col>

      <!-- Display logs as v-cards -->
      <v-row v-else>
        <v-col cols="12" v-for="(log, index) in filteredLogs" :key="index">
          <v-card class="pa-3 mb-3">
            <v-card-title class="text-h6 text-sm-subtitle-1">
              {{ log.activity_type }} (Log ID: {{ log.log_id }})
            </v-card-title>
            <v-card-subtitle>
              <div v-if="log.company_id">
                <strong>Company ID:</strong> {{ log.company_id }}
              </div>
              <div v-if="log.user_id">
                <strong>User ID:</strong> {{ log.user_id }}
              </div>
            </v-card-subtitle>
            <v-card-text>
              <strong>Details:</strong> {{ log.details }}
              <br />
              <strong>Table Name:</strong> {{ log.table_name }}
              <br />
              <strong>Timestamp:</strong> {{ formatTimestamp(log.timestamp) }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-row>

    <!-- Modal for Deleted Logs -->
    <v-dialog v-model="isDeletedModalOpen" max-width="600px">
      <v-card>
        <v-card-title class="text-h6">
          Deleted Logs
          <v-spacer></v-spacer>
          <v-btn icon @click="isDeletedModalOpen = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <!-- Load NotifDeleted.vue here -->
          <notif-deleted :logs="deletedLogs" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="isDeletedModalOpen = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import NotifDeleted from "../components/notifideleted.vue"; // Import the component

export default {
  components: {
    NotifDeleted,
  },
  data() {
    return {
      activityLogs: [], // Store all logs fetched from the API
      filteredLogs: [], // Logs currently displayed in the main view (Deleted = 0)
      deletedLogs: [], // Logs with Deleted = 1
      isDeletedModalOpen: false, // Tracks if the modal is open
    };
  },
  mounted() {
    this.fetchAllLogs(); // Fetch all logs when the component is mounted
  },
  methods: {
    fetchAllLogs() {
      this.$axios
        .get("/activity_log") // Fetch all logs
        .then((response) => {
          this.activityLogs = response.data; // Store all logs
          this.filteredLogs = response.data.filter((log) => log.Deleted === 0); // Default view: active logs
          this.deletedLogs = response.data.filter((log) => log.Deleted === 1); // Pre-filter deleted logs
          console.log("Raw API response:", response.data);
        })
        .catch((error) => {
          console.error("Error fetching activity logs:", error);
        });
    },
    openDeletedModal() {
      this.isDeletedModalOpen = true; // Open the modal for deleted logs
    },
    formatTimestamp(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleString();
    },
  },
};
</script>

<style lang="scss" scoped></style>
