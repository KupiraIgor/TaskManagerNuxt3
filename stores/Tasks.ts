import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref([
    {
      id_col: 1,
      title: 'To do',
      list: [
        {
          name: 'Johanna',
          id: 3,
        },
        {
          name: 'Juan',
          id: 1,
        },
      ],
    },
    {
      id_col: 2,
      title: 'In progress',
      list: [
        {
          name: 'Johanna',
          id: 5,
        },
        {
          name: 'Juan',
          id: 4,
        },
      ],
    },
    {
      id_col: 3,
      title: 'Done',
      list: [
        {
          name: 'Johanna',
          id: 5,
        },
        {
          name: 'Juan',
          id: 4,
        },
      ],
    },
  ])

  const addTask = (id_col: number, body: { name: string; id: number }) => {
    const column = tasks.value.find((col) => col.id_col === id_col)
    if (column) {
      column.list.push(body)
    } else {
      console.error('Column with id_col', id_col, 'not found')
    }
  }
  return { tasks, addTask }
})
