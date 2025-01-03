<template>
    <v-dialog v-model="visible" max-width="400">
      <v-card class="bgColor">
        <v-card-title>
          <span class="headline">Confirmation</span>
        </v-card-title>
        <v-card-text>
          Are you sure you want to delete <strong>{{ userName }}</strong>?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="confirmDelete">Yes</v-btn>
          <v-btn color="grey" text @click="cancelDelete">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    name: "NotificationWarn",
    props: {
      visible: {
        type: Boolean,
        required: true,
      },
      userName: {
        type: String,
        required: true,
      },
    },
    methods: {
      confirmDelete() {
        this.$emit("confirm");
      },
      cancelDelete() {
        this.$emit("cancel");
      },
    },
  };
  </script>
  
  <style scoped>
  .bgColor {
    background-color: whitesmoke;
    color: #343a40;
    border-radius: 4px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
 
  }
  </style>
  