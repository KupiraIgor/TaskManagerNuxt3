<script setup lang="ts">
import { performersArr, priorities, responsibilities } from '~/data'
import type { Col, Performer, Task } from '~/types/tasks'

const store = useTasksStore()

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
      store.changeStatus(props.task.id, props.idStatus, status.value)
    }
  },
})

const { tasks } = storeToRefs(store)

const name = ref(props.task.name)
const description = ref(props.task.description)
const status = ref(props.idStatus)
const priority = ref(props.task.priority)
const responsibility = ref(props.task.responsibility)
const performers = ref(props.task.performers)

const statusOptions = computed(() =>
  tasks.value.map((col: Col) => ({
    status: col.status,
    id_status: col.id_status,
  })),
)

const updateValueOnBlur = (field: string, newValue: string | Performer) => {
  store.updateTaskValue(props.idStatus, props.task.id, field, newValue)
}

const handleKeydown = (event: Event<HTMLInputElement>) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    event.target.blur()
  }
}

const trimLinesDescription = (field: string) => {
  if (description.value) {
    const lines = description.value.split('\n')
    const trimmedLines = lines
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
    description.value = trimmedLines.join('\n')
  }

  updateValueOnBlur(field, description.value)
}

const deleteTask = () => {
  store.deleteTask(props.task.id)
}
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
          v-model="name"
          variant="underlined"
          label="Name"
          no-resize
          row-height="15"
          rows="1"
          auto-grow
          @blur="updateValueOnBlur('name', name)"
          hide-details
          @keydown="handleKeydown"
          class="mb-5 mt-2 text-h2 modal-edit__name"
        />
        <v-textarea
          v-model="description"
          variant="solo-filled"
          label="Description"
          no-resize
          row-height="25"
          rows="3"
          auto-grow
          @blur="trimLinesDescription('description', description)"
          hide-details
          class="mb-5"
        />
        <v-select
          label="Status"
          :items="statusOptions"
          item-title="status"
          item-value="id_status"
          v-model="status"
          @blur="updateValueOnBlur('status_id', status)"
          variant="underlined"
        />
        <v-select
          label="Priority"
          v-model="priority"
          :items="priorities"
          @blur="updateValueOnBlur('priority', priority)"
          variant="underlined"
        />
        <v-combobox
          v-model="responsibility"
          :items="responsibilities"
          @blur="updateValueOnBlur('responsibility', responsibility)"
          variant="underlined"
          label="Person in charge"
        />
        <v-select
          v-model="performers"
          :items="performersArr"
          item-title="name"
          label="Executors"
          multiple
          return-object
          variant="underlined"
          @blur="updateValueOnBlur('performers', performers)"
        >
          <template v-slot:selection="data">
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
