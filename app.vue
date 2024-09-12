<script setup lang="ts">
const store = useTasksStore()

onMounted(() => {
  // store.getTasksLocalStorage()
})
</script>

<template>
  <div>
    <Head>
      <Title>TestTask</Title>
      <Meta name="description" content="Test task" />
    </Head>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style lang="scss"></style>
