<template>
    <div>
        <v-container>
            <!-- Deleted Users Table -->
            <v-data-table :headers="headers" :items="deletedUsers" class="elevation-1">
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title>Deleted Applicants</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                </template>

                <template v-slot:item.actions="{ item }">
                    <div class="button-group">
                        <v-btn color="primary" @click="viewUser(item)" small>
                            View
                        </v-btn>
                        <v-btn color="green" @click="restoreUser(item)" small>
                            Restore
                        </v-btn>
                    </div>
                </template>
            </v-data-table>
        </v-container>
    </div>
</template>


<script>
import NotificationWarn from "@/components/job-seekers/notificationwarn.vue";

export default {
    components: {
        NotificationWarn,
    },
    data() {
        return {
            headers: [
                { text: "User ID", value: "user_id" },
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
                    this.deletedUsers = response.data.filter((user) => user.Deleted === 1);
                })
                .catch((error) => {
                    console.error("Error fetching users:", error);
                });
        },
        viewUser(user) {
            alert(`Viewing user: ${user.full_name}`);
        },
        restoreUser(user) {
            this.$axios
                .put(`/users/${user.user_id}`, { Deleted: 0 }) // Restore user
                .then(() => {
                    // Update local state
                    this.deletedUsers = this.deletedUsers.filter(
                        (u) => u.user_id !== user.user_id
                    );
                })
                .catch(() => {
                    alert("Failed to restore user.");
                });
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