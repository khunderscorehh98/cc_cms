<template>
    <v-container class="login-container" fill-height>
        <v-row align="center" justify="center">
            <v-col cols="12" md="6" lg="4">
                <v-card class="pa-4">
                    <v-card-title class="headline montserrat-header">Login</v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field v-model="username" label="Username" required outlined
                                class="montserrat-body"></v-text-field>
                            <v-text-field v-model="password" label="Password" type="password" required outlined
                                class="montserrat-body"></v-text-field>
                            <v-btn block color="primary" @click="handleLogin">Login</v-btn>
                            <br />
                            <em @click="registerPage">Haven't registered yet? <em class="blue-text">Register Here</em></em>
                        </v-form>
                        <br />
                        <em>Other ways to login:</em>
                        <br />
                        <v-row>
                            <v-col>
                                <v-btn block text x-large>
                                    <v-icon>
                                        mdi-google
                                    </v-icon>
                                </v-btn>

                            </v-col>
                            <v-col>

                                <v-btn block text x-large>
                                    <v-icon>
                                        mdi-apple
                                    </v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        handleLogin() {
            // Replace this logic with actual authentication and validation
            if (this.username && this.password) {
                // Simulate successful login
                this.$emit('loginSuccess', true);
            } else {
                alert('Please enter your username and password.');
            }
        },
        registerPage() {
            console.log('Register Page')
        }
    }
};
</script>

<style lang="scss" scoped>
.login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.montserrat-header {
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
}

.montserrat-body {
    font-family: "Montserrat", sans-serif;
}
.blue-text{
    font: blue,
}
</style>