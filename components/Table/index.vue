<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
const store = useTasksStore()

const { tasks, loading } = storeToRefs(store)
</script>

<template>
  <section class="table">
    <div v-if="loading">Loading...</div>
    <div v-else class="table__wrap">
      <div class="table__header">
        <div></div>
        <div class="table__header-item">Card</div>
        <div class="table__header-item">Status</div>
        <div class="table__header-item">Priority</div>
        <div class="table__header-item">Executors</div>
      </div>
      <div class="table__body">
        <template v-for="status of tasks" :key="status.status">
          <VueDraggable
            v-model="status.list"
            group="rows"
            class="table__row"
            ghostClass="table__row-ghost"
            :animation="150"
            handle="#table-row-drag"
            dragClass="dragging-ticket"
          >
            <template v-for="item of status.list" :key="item.id">
              <TableRowItem :id-status="status.id_status" :task="item" />
            </template>
          </VueDraggable>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.table {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
  height: 100%;

  &__wrap {
    padding: 10px;
    background: #232320;
    color: #dfe0e4;
    border-radius: 10px;
  }

  &__header {
    display: grid;
    grid-template-columns: 2% 35% 21% 21% 21%;
    padding-bottom: 5px;
    font-size: 13px;
    font-weight: 600;

    &-item {
      padding-left: 6px;
    }
  }

  &__row {
    &-ghost {
      opacity: 0.4;
    }
  }
}
</style>
