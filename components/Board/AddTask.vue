<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  idCol: {
    type: Number,
    required: true,
  },
})

const store = useTasksStore()
const inputEl = ref()
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

  store.addTask(props.idCol, { name: inputData.value, id: 12 })
  inputData.value = ''
}

const submitOnEnter = (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    onAddTask()
  }
}
</script>

<template>
  <div class="add-task">
    <v-btn
      v-if="!isShowForm"
      class="add-task__btn"
      variant="text"
      size="small"
      block
      @click="onShowForm"
    >
      add task
    </v-btn>
    <v-form v-else @submit.prevent="onAddTask" class="add-task__form">
      <v-textarea
        v-model="inputData"
        ref="inputEl"
        label="Label"
        variant="outlined"
        rows="2"
        row-height="20"
        hide-details
        class="mb-2"
        no-resize
        @keydown.enter="submitOnEnter"
      ></v-textarea>
      <div class="d-flex">
        <v-btn type="submit" class="flex-1-1-100 mr-2">Submit</v-btn
        ><v-btn
          icon="mdi-window-close"
          density="comfortable"
          rounded
          @click="onShowForm"
        ></v-btn>
      </div>
    </v-form>
    <div
      v-if="isShowForm"
      class="add-task__fixed-bg"
      @click="isShowForm = false"
    ></div>
  </div>
</template>

<style scoped lang="scss">
.add-task {
  &__form {
    position: relative;
    z-index: 2;
  }

  &__fixed-bg {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
