<template>
    <div>
      <v-btn
        fab
        bottom
        right
        color="primary"
        @click="handleClick"
        class="d-sm-none"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      handleClick() {
        this.$emit("toggleSidebar");
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .v-btn {
    position: fixed;
    bottom: 16px;
    right: 16px;
    z-index: 9999;
  }
  </style>
  