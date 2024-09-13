<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import type { Task } from '~/types/tasks'

const props = defineProps<{
  idStatus: string
}>()

const store = useTasksStore()

const onAddTask = () => {
  if (!inputData.value.trim()) {
    return
  }

  const task: Task = {
    name: inputData.value,
    id: uuidv4(),
    description: '',
    priority: 'Low',
    responsibility: '',
    performers: [],
  }

  store.addTask(props.idStatus, task)
  inputData.value = ''
}

const { inputEl, wrapEl, isShowForm, inputData, onShowForm, submitOnEnter } =
  useFormHandler(onAddTask)
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
