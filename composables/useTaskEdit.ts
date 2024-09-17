import { ref } from 'vue'
import type { Task } from '~/types/tasks'
import { useTasksStore } from '~/stores/tasks'

export function useTaskEdit(props: { task: Task; idStatus: string }) {
  const store = useTasksStore()
  const status = ref(props.idStatus)

  const statusOptions = computed(() => store.statusOptions)

  const updateStatusOnBlur = () => {
    store.changeStatus(props.task.id, props.idStatus, status.value)
  }

  return {
    status,
    store,
    statusOptions,
    updateStatusOnBlur,
  }
}
