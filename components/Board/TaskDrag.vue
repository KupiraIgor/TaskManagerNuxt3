<script setup lang="ts">
import type { Task } from '~/types/tasks'
const store = useTasksStore()

const props = defineProps<{
  task: Task
  idStatus: string
}>()

const openModal = () => {
  store.openModalEditTask(props.task, props.idStatus)
}
</script>

<template>
  <div class="task-drag">
    <div @click="openModal" class="task-drag__task">
      <div class="task-drag__name">{{ task.name ? task.name : 'No name' }}</div>
      <v-icon icon="mdi-pencil" size="small" class="task-drag__pencil"></v-icon>
      <div class="task-drag__wrap">
        <div v-if="task?.performers?.length">
          <v-avatar
            v-for="user of task.performers"
            class="text-uppercase task-drag__avatar"
            :class="`bg-${user.color}`"
            size="x-small"
          >
            <v-tooltip activator="parent" location="bottom">
              {{ user.name }}
            </v-tooltip>
            {{ user.name.slice(0, 1) }}
          </v-avatar>
        </div>
        <div
          v-if="task.priority"
          class="task-drag__priority"
          :class="task.priority"
        >
          <v-tooltip activator="parent" location="bottom">
            {{ task.priority }} priority
          </v-tooltip>
        </div>
      </div>
    </div>
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
    padding: 6px 10px;
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

  &__avatar {
    margin-left: -5px;
  }

  &__priority {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    margin-left: auto;

    &.Low {
      background: green;
    }

    &.Medium {
      background: orange;
    }

    &.High {
      background: red;
    }
  }

  &__name {
    font-size: 18px;
  }

  &__wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 5px;
  }

  &__pencil {
    position: absolute;
    top: 5px;
    right: 5px;
    background: #393937;
    width: 24px;
    height: 24px;
    opacity: 0;
    transition: opacity 0.1s ease-in;
  }
}
</style>
