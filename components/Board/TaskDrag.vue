<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
  idStatus: {
    type: Number,
    required: true,
  },
})

const isOpenModal = ref(false)
</script>

<template>
  <div class="task-drag">
    <div @click="isOpenModal = true" class="task-drag__task">
      {{ task.name ? task.name : 'No name' }}
      <v-icon icon="mdi-pencil" size="small" class="task-drag__pencil"></v-icon>
    </div>
    <BoardModalEdit v-model="isOpenModal" :task="task" :id-status="idStatus" />
  </div>
</template>

<style scoped lang="scss">
.task-drag {
  margin-bottom: 5px;

  &:last-child {
    margin-bottom: 0;
  }

  &__task {
    position: relative;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 8px;
    background: #393937;
    overflow: hidden;
    overflow-wrap: break-word;
    white-space: normal;

    &:hover {
      .task-drag__pencil {
        opacity: 1;
      }
    }
  }

  &__pencil {
    position: absolute;
    top: 0;
    right: 5px;
    background: #393937;
    width: 24px;
    height: 34px;
    opacity: 0;
    transition: opacity 0.1s ease-in;
  }
}
</style>
