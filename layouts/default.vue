<script setup lang="ts"></script>

<template>
  <v-app class="default-layout">
    <TheHeader />
    <div class="default-layout__main">
      <TheSidebar />
      <main>
        <slot />
      </main>
    </div>
  </v-app>
</template>

<style scoped lang="scss">
.default-layout {
  background: #e4e4e4;

  &__main {
    display: flex;
    height: 100%;

    main {
      width: 100%;
      padding: 20px;
      overflow-x: auto;
    }
  }
}
</style>
