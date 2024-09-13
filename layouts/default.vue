<script setup lang="ts"></script>

<template>
  <v-app class="app">
    <TheHeader />
    <main>
      <slot />
    </main>
  </v-app>
</template>

<style scoped>
.app {
  background: #e4e4e4;
}
</style>
