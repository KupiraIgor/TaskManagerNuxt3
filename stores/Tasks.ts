import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref([
    {
      id_status: 1,
      status: 'To do',
      list: [],
    },
    {
      id_status: 2,
      status: 'In progress',
      list: [],
    },
  ])

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

  return { tasks, addTask, updateTaskValue }
})
