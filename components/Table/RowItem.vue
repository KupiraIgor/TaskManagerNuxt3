<script setup lang="ts">
import type { Task } from '~/types/tasks'
import { performersArr, priorities } from '~/data'
import { useModal } from '~/composables/useModal'

const props = defineProps<{
  task: Task
  idStatus: string
}>()

const store = useTasksStore()
const { statusOptions } = storeToRefs(store)

const { status, priority, performers, updateValueOnBlur, updateStatusOnBlur } =
  useTaskEdit(props)
const { isOpenModal, openModal } = useModal()
</script>

<template>
  <div class="table-row">
    <span class="table-row__drag" id="table-row-drag">
      <v-icon icon="mdi-drag"></v-icon>
    </span>
    <div class="table-row__name" @click="openModal">
      <div class="table-row__nowrap">
        <div class="table-row__nowrap-wrap">
          {{ task.name ? task.name : 'No name' }}
        </div>
      </div>
      <v-icon icon="mdi-pencil" size="small" class="table-row__pencil"></v-icon>
    </div>
    <span>
      <v-select
        :items="statusOptions"
        item-title="status"
        item-value="id_status"
        v-model="status"
        variant="plain"
        hide-details
        @update:modelValue="updateStatusOnBlur"
      />
    </span>
    <span>
      <v-select
        v-model="priority"
        :items="priorities"
        variant="plain"
        hide-details
        @blur="updateValueOnBlur('priority', priority)"
    /></span>
    <span>
      <v-select
        v-model="performers"
        :items="performersArr"
        item-title="name"
        multiple
        return-object
        variant="plain"
        hide-details
        @blur="updateValueOnBlur('performers', performers)"
      >
        <template v-slot:selection="data: any">
          <v-avatar
            class="text-uppercase"
            :class="`bg-${data.item.raw.color}`"
            size="x-small"
          >
            {{ data.item.title.slice(0, 1) }}
          </v-avatar>
        </template>
      </v-select>
    </span>
    <ModalsEditTask v-model="isOpenModal" :task="task" :id-status="idStatus" />
  </div>
</template>

<style lang="scss">
.table-row {
  display: grid;
  grid-template-columns: 2% 35% 21% 21% 21%;
  align-items: center;
  border-top: 1px solid #303030;

  &__drag {
    cursor: grab;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__name {
    position: relative;
    padding-left: 6px;
    padding-right: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    &:hover {
      background: rgba(255, 255, 255, 0.07);

      .table-row {
        &__pencil {
          opacity: 1;
        }
      }
    }
  }

  &__nowrap {
    white-space: nowrap;
    width: calc(100% - 24px);

    &-wrap {
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
    }
  }

  &__pencil {
    width: 24px;
    height: 24px;
    opacity: 0;
    transition: opacity 0.1s ease-in;
  }

  .v-field__input {
    padding-top: 4px !important;
    padding-left: 6px;
  }

  .v-field__append-inner {
    padding-top: 4px !important;
    align-items: center !important;
    opacity: 0;
  }

  .v-input__control {
    &:hover {
      background: rgba(255, 255, 255, 0.07);

      .v-field__append-inner {
        opacity: 1;
      }
    }
  }
}
</style>
