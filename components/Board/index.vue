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
        handle=".board-col__title"
      >
        <template v-for="item of tasks" :key="item.id_col">
          <BoardCol
            v-model="item.list"
            :title="item.title"
            :id-col="item.id_col"
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
