export type Tasks = Status[]

export interface Status {
  id_status: string
  status: string
  list: Task[]
}

export interface Task {
  name: string
  id: string
  priority: string
  responsibility: string
  performers: Performer[]
  description?: string
}

export interface Performer {
  name: string
  color: string
}
