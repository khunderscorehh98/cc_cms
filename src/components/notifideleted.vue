<template>
    <div>
        <v-container>
            <v-row>
                <!-- No logs message -->
                <v-col cols="12" v-if="logs.length === 0" class="text-center">
                    <p>No deleted logs available.</p>
                </v-col>

                <!-- Deleted logs list -->
                <v-row v-else>
                    <v-col cols="12" v-for="(log, index) in logs" :key="index">
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
                            <v-row>
                                <v-col cols="9"></v-col>
                                <v-col cols="3">
                                    <!-- Pass the log ID to the restoreLog method -->
                                    <v-btn color="primary" @click="restoreLog(log.log_id)">Restore</v-btn>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
            </v-row>
        </v-container>
    </div>
</template>


<script>
export default {
    props: {
        logs: {
            type: Array,
            required: true, // Expecting the array of deleted logs
        },
    },
    methods: {
        formatTimestamp(timestamp) {
            const date = new Date(timestamp);
            return date.toLocaleString();
        },
        restoreLog(logId) {
            if (!logId) {
                console.error('Log ID is required to restore the log.');
                return;
            }

            const details = "Restoring activity log"; // Add relevant details

            this.$axios
                .put(`/activity_log/${logId}`, { Details: details }) // Send Details in the request body
                .then((response) => {
                    console.log(`Log with ID ${logId} restored:`, response.data);

                    // Remove the restored log from the list
                    const index = this.logs.findIndex((log) => log.log_id === logId);
                    if (index !== -1) {
                        this.logs.splice(index, 1);
                    }
                })
                .catch((error) => {
                    console.error(`Error restoring log with ID ${logId}:`, error.response?.data || error);
                });
        },


    },
};
</script>




<style lang="scss" scoped></style>