<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  idStatus: {
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

const startDrag = () => {
  document.querySelectorAll('.board-col__list').forEach((el) => {
    el.classList.add('_start-drag')
  })
}

const endDrag = () => {
  document.querySelectorAll('.board-col__list').forEach((el) => {
    if (el.classList.contains('_start-drag')) {
      el.classList.remove('_start-drag')
    }
  })
}
</script>

<template>
  <div class="board-col">
    <h2 class="board-col__title" id="column-drag-handle">{{ status }}</h2>
    <VueDraggable
      v-model="localValue"
      group="tasks"
      class="board-col__list"
      ghostClass="board-col__ghost"
      animation="150"
      @start="startDrag"
      @end="endDrag"
    >
      <BoardTaskDrag
        v-for="item in localValue"
        :key="item.id"
        :id-status="idStatus"
        :task="item"
      />
    </VueDraggable>
    <div class="board-col__bottom">
      <BoardAddTask :id-status="idStatus" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.board-col {
  position: relative;
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
    cursor: pointer;
  }

  &__list {
    height: 100%;
    padding: 5px 10px 0;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: none;
    }

    &._start-drag {
      &::before {
        display: block;
      }
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
  }
}
</style>
