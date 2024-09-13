<script setup lang="ts">
const store = useTasksStore()

onMounted(() => {
  store.getTasksLocalStorage()
})
</script>

<template>
  <div>
    <Head>
      <Title>Test task | The Originals</Title>
      <Meta name="description" content="Test task The Originals" />
    </Head>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style lang="scss"></style>
