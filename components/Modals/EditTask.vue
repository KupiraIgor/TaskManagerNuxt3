<script setup lang="ts">
import { performersArr, priorities, responsibilities } from '~/data'
import type { Task } from '~/types/tasks'

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: boolean
  task: Task
  idStatus: string
}>()

const localValue = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
    if (!val && props.idStatus !== status.value) {
      //delete after modal close
      setTimeout(() => {
        updateStatusOnBlur()
      }, 300)
    }
  },
})

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    const inputElement = event.target as HTMLInputElement
    event.preventDefault()
    inputElement.blur()
  }
}

const deleteTask = () => {
  store.deleteTask(props.task.id)
}

const { status, updateStatusOnBlur, store, statusOptions } = useTaskEdit(props)
</script>

<template>
  <v-dialog v-model="localValue" max-width="800" class="modal-edit">
    <v-card>
      <v-btn
        icon="mdi-close"
        class="modal-edit__close"
        @click="localValue = false"
        density="comfortable"
      />
      <template v-slot:text>
        <v-textarea
          v-model="task.name"
          variant="underlined"
          label="Name"
          no-resize
          row-height="15"
          rows="1"
          auto-grow
          hide-details
          @keydown="handleKeydown"
          class="mb-5 mt-2 text-h2 modal-edit__name"
        />
        <v-textarea
          v-model="task.description"
          variant="solo-filled"
          label="Description"
          no-resize
          row-height="25"
          rows="3"
          auto-grow
          hide-details
          class="mb-5"
        />
        <v-select
          label="Status"
          :items="statusOptions"
          item-title="status"
          item-value="id_status"
          v-model="status"
          variant="underlined"
        />
        <v-select
          label="Priority"
          v-model="task.priority"
          :items="priorities"
          variant="underlined"
        />
        <v-combobox
          v-model="task.responsibility"
          :items="responsibilities"
          variant="underlined"
          label="Person in charge"
        />
        <v-select
          v-model="task.performers"
          :items="performersArr"
          item-title="name"
          label="Executors"
          multiple
          return-object
          variant="underlined"
        >
          <template v-slot:selection="data: any">
            <v-chip
              :key="JSON.stringify(data.item)"
              v-bind="data.attrs"
              :disabled="data.disabled"
              :model-value="data.selected"
              size="small"
              @click:close="data.parent.selectItem(data.item)"
            >
              <template v-slot:prepend>
                <v-avatar
                  class="text-uppercase"
                  :class="`bg-${data.item.raw.color}`"
                  start
                >
                  {{ data.item.title.slice(0, 1) }}
                </v-avatar>
              </template>
              {{ data.item.title }}
            </v-chip>
          </template>
        </v-select>
        <div class="d-flex justify-end">
          <v-btn color="red" @click="deleteTask">delete this task</v-btn>
        </div>
      </template>
    </v-card>
  </v-dialog>
</template>

<style lang="scss">
.modal-edit {
  &__close {
    position: absolute;
    top: 10px;
    right: 10px;
    box-shadow: none !important;

    .v-btn {
      box-shadow: none !important;
    }
  }

  &__name {
    textarea {
      font-size: 24px;
    }
  }
}
</style>
