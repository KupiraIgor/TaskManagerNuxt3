import { ref, watch } from 'vue'
import type { Task } from '~/types/tasks'
import { useTasksStore } from '~/stores/tasks'

export function useTaskEdit(props: { task: Task; idStatus: string }) {
  const store = useTasksStore()
  const status = ref(props.idStatus)
  const priority = ref(props.task.priority)
  const performers = ref([...props.task.performers])

  const updateValueOnBlur = (field: keyof Task, newValue: any) => {
    store.updateTaskValue(props.idStatus, props.task.id, field, newValue)
  }

  const updateStatusOnBlur = () => {
    store.changeStatus(props.task.id, props.idStatus, status.value)
  }

  watch(
    () => props.task.performers,
    (newPerformers) => {
      performers.value = [...newPerformers]
    },
  )

  watch(
    () => props.task.priority,
    (newPriority) => {
      priority.value = newPriority
    },
  )

  return {
    status,
    priority,
    performers,
    updateValueOnBlur,
    updateStatusOnBlur,
  }
}
