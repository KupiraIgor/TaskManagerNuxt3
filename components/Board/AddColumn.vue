<script setup lang="ts">
const store = useTasksStore()
import { v4 as uuidv4 } from 'uuid'

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

const onAddColumn = () => {
  const column = {
    id_status: uuidv4(),
    status: inputData.value,
    list: [],
  }
  store.addColumn(column)
  inputData.value = ''
  isShowForm.value = false
}

const submitOnEnter = (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    onAddColumn()
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
  <div ref="wrapEl" class="add-column">
    <v-btn
      v-if="!isShowForm"
      class="add-column__btn"
      variant="tonal"
      block
      @click="onShowForm"
    >
      add column
    </v-btn>
    <v-form v-else @submit.prevent="onAddColumn" class="add-column__form">
      <v-text-field
        v-model="inputData"
        ref="inputEl"
        variant="outlined"
        hide-details
        density="compact"
        class="mb-2"
        @keydown.enter="submitOnEnter"
      ></v-text-field>
      <div class="d-flex">
        <v-btn type="submit" class="flex-1-1-100 mr-2">Add column</v-btn
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
.add-column {
  flex: 0 0 272px;
}
</style>
