<script setup lang="ts">
const store = useTasksStore()

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  task: {
    type: Object,
    required: true,
  },
  idStatus: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const localValue = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})
const { tasks } = storeToRefs(store)
const name = ref(props.task.name)
const description = ref(props.task.description)

const status = ref(props.idStatus)

const statusOptions = computed(() =>
  tasks.value.map((task) => ({
    status: task.status,
    id_status: task.id_status,
  })),
)

const updateValueOnBlur = (field: string, newValue: string) => {
  store.updateTaskValue(props.idStatus, props.task.id, field, newValue)
}

const handleKeydown = (event) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    event.target.blur()
  }
}

const trimLinesDescription = (field: string) => {
  const lines = description.value.split('\n')
  const trimmedLines = lines
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
  description.value = trimmedLines.join('\n')
  updateValueOnBlur(field, description.value)
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
      >
      </v-btn>
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
        <v-select
          label="Status"
          :items="statusOptions"
          item-title="status"
          item-value="id_status"
          v-model="status"
          variant="underlined"
        ></v-select>
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
        />
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
