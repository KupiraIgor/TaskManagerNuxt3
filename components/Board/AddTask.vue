<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'

const props = defineProps({
  idStatus: {
    type: String,
    required: true,
  },
})

const store = useTasksStore()

const inputEl = ref()
const wrapEl = ref()
const isShowForm = ref(false)
const inputData = ref('')

const onShowForm = () => {
  isShowForm.value = !isShowForm.value

  setTimeout(() => {
    if (isShowForm.value) {
      inputEl.value.focus()
    }
  }, 0)
}

const onAddTask = () => {
  if (!inputData.value.trim()) {
    return
  }

  store.addTask(props.idStatus, { name: inputData.value, id: uuidv4() })
  inputData.value = ''
}

const submitOnEnter = (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    onAddTask()
  }
}

onMounted(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (e && wrapEl.value && !wrapEl.value.contains(e.target as Node)) {
      isShowForm.value = false
    }
  }

  document.addEventListener('mousedown', handleClickOutside)

  onBeforeUnmount(() => {
    document.removeEventListener('mousedown', handleClickOutside)
  })
})
</script>

<template>
  <div ref="wrapEl" class="add-task">
    <v-btn
      v-if="!isShowForm"
      class="add-task__btn"
      variant="text"
      size="small"
      block
      @click="onShowForm"
    >
      add card
    </v-btn>
    <v-form v-else @submit.prevent="onAddTask" class="add-task__form">
      <v-textarea
        v-model="inputData"
        ref="inputEl"
        variant="outlined"
        placeholder="Enter the name of the card..."
        rows="2"
        row-height="20"
        hide-details
        class="mb-2"
        no-resize
        @keydown.enter="submitOnEnter"
      ></v-textarea>
      <div class="d-flex">
        <v-btn type="submit" class="flex-1-1-100 mr-2">Add card</v-btn
        ><v-btn
          icon="mdi-window-close"
          density="comfortable"
          rounded
          @click="onShowForm"
        ></v-btn>
      </div>
    </v-form>
  </div>
</template>

<style scoped lang="scss">
.add-task {
  &__form {
    position: relative;
    z-index: 2;
  }
}
</style>
