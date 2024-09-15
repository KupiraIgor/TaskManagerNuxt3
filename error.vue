<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: Object as () => NuxtError,
})
</script>

<template>
  <div>
    <v-container class="text-center">
      <h1>{{ error?.statusCode }}</h1>
      <NuxtLink to="/">Go back home</NuxtLink>
    </v-container>
  </div>
</template>
