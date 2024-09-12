<script setup lang="ts">
const store = useTasksStore()

const props = defineProps({
  modelValue: {
    type: Boolean,
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

const onDeleteCol = () => {
  store.deleteColumn(props.idStatus)
  localValue.value = false
}
</script>

<template>
  <v-dialog v-model="localValue" max-width="500" class="modal-edit">
    <v-card>
      <template v-slot:text>
        <div class="text-center text-h6">
          Are you sure you want to delete this column?
        </div>
      </template>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text="No" variant="text" @click="localValue = false"></v-btn>
        <v-btn
          color="surface-variant"
          text="Yes"
          variant="flat"
          @click="onDeleteCol"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss"></style>
