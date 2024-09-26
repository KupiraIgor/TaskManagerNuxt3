<script setup lang="ts">
const store = useTasksStore()

const { modalEditTask } = storeToRefs(store)

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
      <ModalsEditTask
        v-model="modalEditTask.is_open"
        :task="modalEditTask.task"
        :id-status="modalEditTask.id_status"
      />
    </NuxtLayout>
  </div>
</template>

<style lang="scss"></style>
