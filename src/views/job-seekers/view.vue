<template>
    <div>
        <small><v-btn text to="/JobSeekers">< back</v-btn></small>
        <v-container>
            <h1>User Details</h1>
        <!-- Conditional rendering for loading, error, or data -->
        <div v-if="loading">
            <p>Loading user details...</p>
        </div>
        <div v-else-if="user">
            <v-container>
                <h2>Displayed Data</h2>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Full Name" :value="user.full_name" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Identification Number" :value="user.id_number" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Email" :value="user.email" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Date of Birth" :value="user.date_of_birth" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Nationality" :value="user.nationality" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Posted Date" :value="user.posted_date" disabled></v-text-field>
                    </v-col>
                </v-row>

                <h2>Additional Information</h2>

                <h3>User Contacts:</h3>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Phone Number" :value="user.phone_number" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Location" :value="user.location" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field label="LinkedIn Profile" :value="user.linkedin_profile" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Portfolio Link" :value="user.portfolio_link" disabled></v-text-field>
                    </v-col>
                </v-row>

                <h3>User Profile:</h3>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Resume" :value="user.resume_link" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Experience Level" :value="user.experience_level" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Skills" :value="user.skills" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Educational Background" :value="user.educational_background"
                            disabled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Certifications" :value="user.certifications" disabled></v-text-field>
                    </v-col>
                </v-row>

                <h3>Job Information:</h3>
                <v-row>
                    <v-col cols="12" sm="6" md="4" v-for="job in jobs" :key="job.job_id">
                        <v-card outlined class="pa-3 mb-3">
                            <p><strong>Job Title:</strong> {{ job.title }}</p>
                            <p><strong>Description:</strong> {{ job.description }}</p>
                            <p><strong>Requirements:</strong> {{ job.requirements }}</p>
                            <p><strong>Location:</strong> {{ job.location }}</p>
                            <p><strong>Salary Range:</strong> {{ job.salary_range }}</p>
                            <p><strong>Employment Type:</strong> {{ job.employment_type }}</p>
                            <p><strong>Closing Date:</strong> {{ job.closing_date }}</p>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>
        <div v-else>
            <p>User not found or an error occurred.</p>
        </div>
        <!-- Debugging button -->
        <!-- <v-btn @click="logUserDetails" color="primary" small>
            Console Log User
        </v-btn> -->
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: null, // Holds user details
            jobs: [], // Holds job details related to the user's applications
            loading: true, // Indicates loading state
        };
    },
    mounted() {
        const userId = this.$route.params.id; // Fetch the ID from route params
        this.fetchUserDetails(userId);
    },
    methods: {
        async fetchUserDetails(userId) {
            try {
                this.loading = true;

                // Fetch user data from /users endpoint
                const userResponse = await this.$axios.get(`/users/${userId}`);
                const user = Array.isArray(userResponse.data) ? userResponse.data[0] : userResponse.data;

                if (!user) {
                    throw new Error("User not found.");
                }

                // Fetch additional data from /user_contacts endpoint
                const contactsResponse = await this.$axios.get(`/user_contacts/${userId}`);
                const contacts = Array.isArray(contactsResponse.data) ? contactsResponse.data[0] : contactsResponse.data;

                // Fetch additional data from /user_profiles endpoint
                const profileResponse = await this.$axios.get(`/user_profiles/${userId}`);
                const profile = Array.isArray(profileResponse.data) ? profileResponse.data[0] : profileResponse.data;

                // Fetch job details based on user's applications
                const applicationsResponse = await this.$axios.get(`/applications?user_id=${userId}`);
                const applications = Array.isArray(applicationsResponse.data) ? applicationsResponse.data : [];

                const jobPromises = applications.map((application) =>
                    this.$axios.get(`/jobs/${application.job_id}`).then((res) => res.data[0])
                );
                const jobs = await Promise.all(jobPromises);

                // Combine user data
                this.user = {
                    ...user,
                    ...contacts,
                    ...profile,
                };

                // Set jobs data
                this.jobs = jobs;
            } catch (error) {
                console.error("Error fetching user details:", error);
                this.user = null;
                this.jobs = [];
            } finally {
                this.loading = false;
            }
        },
        logUserDetails() {
            console.log("User details:", this.user);
            console.log("Jobs:", this.jobs);
        },
    },
};
</script>

<style scoped>
h1 {
    margin-bottom: 1rem;
}

p {
    margin: 0.5rem 0;
}

.v-card {
    border-radius: 8px;
}
</style>