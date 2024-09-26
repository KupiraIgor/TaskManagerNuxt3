import { ref } from 'vue'
import type { Task } from '~/types/tasks'
import { useTasksStore } from '~/stores/tasks'

export function useTaskEdit(props: {
  task: Task | null
  idStatus: string | null
}) {
  const store = useTasksStore()
  const statusValue = ref(props.idStatus)

  watch(
    () => props.idStatus,
    (newValue) => {
      statusValue.value = newValue
    },
  )

  const statusOptions = computed(() => store.statusOptions)

  const updateStatusOnBlur = () => {
    if (props.task && props.idStatus && statusValue.value) {
      store.changeStatus(props.task.id, props.idStatus, statusValue.value)
    }
  }

  return {
    statusValue,
    store,
    statusOptions,
    updateStatusOnBlur,
  }
}
