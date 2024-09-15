<script setup lang="ts"></script>

<template>
  <header class="header">
    <v-container>
      <div class="header__body">
        <div class="header__logo">Test task The Originals</div>
      </div>
    </v-container>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: sticky;
  z-index: 100;
  top: 0;
  left: 0;
  background: #d8d5d5;
  box-shadow: 0 3px 10px #1727504d;

  &__logo {
    font-weight: 600;
    text-align: center;
    font-size: 22px;
  }
}
</style>
