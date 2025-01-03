<template>
  <div>
    <v-container>
      <v-card>
        <v-container>
          <strong>Add New Applicant</strong>
          <hr>
          <br>
          <v-row>
            <v-col cols="6">
              <v-text-field outlined placeholder="Applicant Full Name"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field outlined placeholder="Applicant Identification Number"></v-text-field>
            </v-col>
          </v-row>
          <v-text-field outlined placeholder="Applicant Email"></v-text-field>
          <v-text-field outlined placeholder="Applicant Nationality"></v-text-field>
        </v-container>
      </v-card>
    </v-container>
    <v-container>
      <v-data-table :headers="headers" :items="filteredUsers" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Applicants</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>

        <template v-slot:item.actions="{ item }">
          <div class="button-group">
            <!-- Dynamic route for "View" button -->
            <v-btn :to="`/job-seekers/view/${item.user_id}`" color="primary" small>
              View
            </v-btn>
            <v-btn color="red" @click="showDeleteWarning(item)" small>
              Delete
            </v-btn>
            <v-btn color="blue" @click="archiveUser(item)" small>
              Archive
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-container>

    <!-- NotificationWarn Component -->
    <NotificationWarn :visible.sync="warningDialogVisible" :userName="selectedUser?.full_name"
      @confirm="deleteConfirmed" @cancel="deleteCancelled" />

    <NotificationArc :visible.sync="archiveDialogVisible" :userName="selectedUser?.full_name"
      @confirm="archiveConfirmed" @cancel="archiveCancelled" />

  </div>
</template>

<script>
import NotificationWarn from "@/components/job-seekers/notificationwarn.vue";
import NotificationArc from "@/components/job-seekers/notificationarc.vue";

export default {
  components: { NotificationWarn, NotificationArc },
  data() {
    return {
      headers: [
        { text: "User ID", value: "user_id" },
        { text: "Identification Number", value: "id_number" },
        { text: "Full Name", value: "full_name" },
        { text: "Email", value: "email" },
        { text: "Date of Birth", value: "date_of_birth" },
        { text: "Nationality", value: "nationality" },
        { text: "Posted Date", value: "posted_date" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      users: [],
      filteredUsers: [],
      deletedUsers: [],
      warningDialogVisible: false,
      selectedUser: null,
    };
  },
  mounted() {
    this.fetchAllUsers();
  },
  methods: {
    fetchAllUsers() {
      this.$axios
        .get("/users")
        .then((response) => {
          this.users = response.data;

          // Active users (not deleted, not archived)
          this.filteredUsers = this.users.filter((user) => user.Deleted === 0 && user.Archive === 0);

          // Archived users (archived but not deleted)
          this.archivedUsers = this.users.filter((user) => user.Archive === 1 && user.Deleted === 0);

          // Deleted users (deleted irrespective of archive status)
          this.deletedUsers = this.users.filter((user) => user.Deleted === 1);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    },

    showDeleteWarning(user) {
      // Show the delete confirmation dialog
      this.selectedUser = user;
      this.warningDialogVisible = true;
    },
    deleteConfirmed() {
      // Confirm delete action
      this.$axios
        .delete(`/users/${this.selectedUser.user_id}`)
        .then(() => {
          // Mark user as deleted locally
          this.users = this.users.map((u) =>
            u.user_id === this.selectedUser.user_id ? { ...u, Deleted: 1 } : u
          );

          // Recalculate filtered users
          this.filteredUsers = this.users.filter((user) => user.Deleted === 0);
          this.deletedUsers = this.users.filter((user) => user.Deleted === 1);

          // Close delete dialog
          this.warningDialogVisible = false;
        })
        .catch(() => {
          alert("Failed to delete user.");
        });
    },
    deleteCancelled() {
      // Cancel delete action
      this.warningDialogVisible = false;
    },
    showArchiveWarning(user) {
      // Show the archive confirmation dialog
      this.selectedUser = user;
      this.archiveDialogVisible = true;
    },
    archiveConfirmed() {
      // Confirm archive action
      this.$axios
        .patch(`/users/${this.selectedUser.user_id}`, { Archive: 1 })
        .then(() => {
          // Mark user as archived locally
          this.users = this.users.map((u) =>
            u.user_id === this.selectedUser.user_id ? { ...u, Archive: 1 } : u
          );

          // Recalculate filtered users
          this.filteredUsers = this.users.filter((user) => user.Deleted === 0 && user.Archive === 0);
          this.archivedUsers = this.users.filter((user) => user.Archive === 1 && user.Deleted === 0);

          // Close archive dialog
          this.archiveDialogVisible = false;
          alert("User archived successfully.");
        })
        .catch(() => {
          alert("Failed to archive user.");
        });
    },
    archiveCancelled() {
      // Cancel archive action
      this.archiveDialogVisible = false;
    },
  },

};
</script>

<style scoped>
.button-group {
  display: flex;
  gap: 8px;
}
</style>
