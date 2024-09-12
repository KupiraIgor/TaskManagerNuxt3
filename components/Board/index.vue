<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
const store = useTasksStore()

const { tasks } = storeToRefs(store)
</script>

<template>
  <div class="board">
    <v-container class="board__container">
      <VueDraggable
        v-model="tasks"
        group="cols"
        class="board__cols"
        ghostClass="board__cols-ghost"
        animation="150"
        handle="#column-drag-handle"
      >
        <template v-for="item of tasks" :key="item.status">
          <BoardColumnDrag
            v-model="item.list"
            :status="item.status"
            :id-status="item.id_status"
          />
        </template>
      </VueDraggable>
    </v-container>
  </div>
</template>

<style scoped lang="scss">
.board {
  &__cols {
    display: flex;
    gap: 20px;
    align-items: flex-start;

    &-ghost {
      opacity: 0.5;
    }
  }

  &__container {
    overflow-x: auto;
  }
}
</style>
