import { useKanbanStore } from '.'

import trash from '../../assets/trash.svg'
import './Task.css'

function Task({ id }: { id: string }) {
  const task = useKanbanStore(state => state.tasks.find(task => task.id === id))
  const { deleteTask, setDraggedTask } = useKanbanStore.getState()

  if (!task) return null

  return (
    <div className="task" draggable onDragStart={() => setDraggedTask(task.id)}>
      <div>{task.title}</div>
      <div className="bottomWrapper">
        <div>
          <img src={trash} onClick={() => deleteTask(task.id)} />
        </div>
        <div className={`status ${task.state}`}>{task.state}</div>
      </div>
    </div>
  )
}

export default Task
