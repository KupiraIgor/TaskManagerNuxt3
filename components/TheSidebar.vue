<script setup lang="ts"></script>

<template>
  <aside class="sidebar">
    <nav class="sidebar__nav">
      <NuxtLink to="/board" class="sidebar__link">
        <v-icon icon="mdi-view-dashboard-variant-outline" size="large"></v-icon>
        Board
      </NuxtLink>
      <NuxtLink to="/table" class="sidebar__link">
        <v-icon icon="mdi-format-list-bulleted" size="large"></v-icon>
        Table
      </NuxtLink>
    </nav>
  </aside>
</template>

<style scoped lang="scss">
.sidebar {
  width: 250px;
  flex: 0 0 250px;
  height: 100%;
  background: #d8d5d5;
  box-shadow: 0 3px 10px #1727504d;
  padding: 10px;

  &__nav {
    position: sticky;
    z-index: 99;
    top: 75px;
    left: 0;
  }

  &__link {
    width: 100%;
    padding: 10px;
    outline: 0;
    text-decoration: none;
    color: inherit;
    border-radius: 5px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 5px;
    transition: 0.3s ease;

    &:hover {
      background: #c8c8c8;
    }

    &.router-link-active {
      background: #232320;
      color: #d8d5d5;
    }
  }
}
</style>
