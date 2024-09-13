export const priorities = ['Low', 'Medium', 'High']
export const responsibilities = ['Cindy', 'Naomi', 'Jane', 'Hannah', 'Julie']

export const performersArr = [
  {
    name: 'Richard',
    color: 'grey',
  },
  {
    name: 'Michael',
    color: 'teal',
  },
  {
    name: 'Justin',
    color: 'blue',
  },
  {
    name: 'Parker',
    color: 'green',
  },
  {
    name: 'Melanie',
    color: 'red',
  },
  {
    name: 'Stacy',
    color: 'purple',
  },
  {
    name: 'Sarah',
    color: 'indigo',
  },
]

export const initTasks = [
  {
    id_status: '4ebcb86d-f05c-4311-a449-2fdd6df26b58',
    status: 'TODO',
    list: [
      {
        name: 'Example task',
        id: '8a87ee1a-9d92-4f22-addd-4a897188db07',
        priority: 'Low',
        responsibility: 'Julie',
        performers: [
          { name: 'Sarah', color: 'indigo' },
          { name: 'Stacy', color: 'purple' },
          { name: 'Melanie', color: 'red' },
        ],
        description: 'Example task desc',
      },
      {
        name: 'One more example',
        id: '2907a9dd-5510-47fd-9f72-2807ce8d11e4',
        priority: 'Medium',
        responsibility: 'Hannah',
        performers: [
          { name: 'Melanie', color: 'red' },
          { name: 'Justin', color: 'blue' },
          { name: 'Michael', color: 'teal' },
        ],
      },
    ],
  },
  {
    id_status: '53aabfa1-94ed-43aa-898c-041aafe21d2a',
    status: 'In progress',
    list: [],
  },
  {
    id_status: '15a1bc71-0c6c-4dcb-a841-a1b9967e2a28',
    status: 'Done',
    list: [
      {
        name: 'Complete task',
        id: '8835fb16-02e7-495a-a323-cb6c8866ac29',
        description: 'Complete task desc',
        priority: 'High',
        responsibility: 'Jane',
        performers: [
          { name: 'Melanie', color: 'red' },
          { name: 'Justin', color: 'blue' },
          { name: 'Parker', color: 'green' },
          { name: 'Michael', color: 'teal' },
          { name: 'Richard', color: 'grey' },
        ],
      },
    ],
  },
]
