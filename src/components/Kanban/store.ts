import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export type stateType = 'Planned' | 'Ongoing' | 'Done'

type task = {
  id: string
  title: string
  state: stateType
}

type kanbanStore = {
  tasks: task[]
  draggedTask: string | null
  addTask: (title: string, state: stateType) => void
  deleteTask: (id: string) => void
  setDraggedTask: (id: string | null) => void
  moveTask: (id: string, stateType: stateType) => void
}

function genTask(title: string, state: stateType) {
  return { id: crypto.randomUUID(), title, state }
}

export const useKanbanStore = create<kanbanStore>()(
  devtools(
    persist(
      (set, get) => ({
        tasks: [],
        draggedTask: null,
        addTask: (title, state) => {
          const newTask = genTask(title, state)
          set(state => ({ tasks: [...state.tasks, newTask] }), false, 'addTask')
        },
        deleteTask: id => {
          const filterTasks = get().tasks.filter(task => task.id !== id)
          set(() => ({ tasks: filterTasks }), false, 'deleteTask')
        },
        setDraggedTask: id => {
          set({ draggedTask: id }, false, 'setDraggedTask')
        },
        moveTask: (id, state) => {
          set(
            storeState => ({
              tasks: storeState.tasks.map(task => (task.id === id ? genTask(task.title, state) : task)),
              // tasks: storeState.tasks.map(task => (task.id === id ? { ...task, state } : task)),
            }),
            false,
            'moveTask',
          )
        },
      }),
      { name: 'store' },
    ),
  ),
)
