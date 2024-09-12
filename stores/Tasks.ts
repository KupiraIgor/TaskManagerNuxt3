import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref([
    {
      id_status: 'qew',
      status: 'To do',
      list: [],
    },
    {
      id_status: 'qweqe',
      status: 'In progress',
      list: [],
    },
  ])
  const loading = ref(true)

  const addColumn = (column) => {
    tasks.value.push(column)
  }

  const deleteColumn = (id_status) => {
    tasks.value = tasks.value.filter((task) => task.id_status !== id_status)
  }

  const addTask = (id_status: number, body: { name: string; id: number }) => {
    const column = tasks.value.find((col) => col.id_status === id_status)
    if (column) {
      column.list.push(body)
    }
  }

  const updateTaskValue = (
    id_status: number,
    id: number,
    field: string,
    newValue: string,
  ) => {
    const column = tasks.value.find((col) => col.id_status === id_status)

    if (column) {
      const task = column.list.find((task) => task.id === id)

      if (task) {
        task[field] = newValue
      }
    }
  }

  const updateLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
  }

  const getTasksLocalStorage = () => {
    tasks.value = JSON.parse(localStorage.getItem('tasks') || '[]')
  }

  onMounted(() => {
    watch(tasks, updateLocalStorage, { deep: true })
    loading.value = false
  })

  return {
    tasks,
    loading,
    addTask,
    addColumn,
    deleteColumn,
    updateTaskValue,
    getTasksLocalStorage,
  }
})
