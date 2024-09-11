<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  idCol: {
    type: Number,
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
</script>

<template>
  <div class="board-col">
    <h2 class="board-col__title">{{ title }}</h2>
    <VueDraggable
      v-model="localValue"
      group="tasks"
      class="board-col__list"
      ghostClass="board-col__ghost"
      animation="150"
    >
      <div v-for="item in localValue" :key="item.id" class="board-col__task">
        {{ item.name }}
      </div>
    </VueDraggable>
    <div class="board-col__bottom" :class="{ _mt: !localValue.length }">
      <BoardAddTask :id-col="idCol" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.board-col {
  background: #232320;
  border-radius: 10px;
  flex: 0 0 272px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  color: #dfe0e4;

  &__title {
    padding: 15px 20px 10px;
    font-size: 18px;
  }

  &__list {
    height: 100%;
    padding: 5px 10px 0;
  }

  &__task {
    padding: 5px 10px;
    margin-bottom: 5px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
    cursor: pointer;
    overflow: hidden;
    overflow-wrap: break-word;
    white-space: normal;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__ghost {
    opacity: 0.5;
  }

  &__btn {
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }

  &__bottom {
    padding: 10px 10px;

    &._mt {
      padding-top: 0;
    }
  }
}
</style>
