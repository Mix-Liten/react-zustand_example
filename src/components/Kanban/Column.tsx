import { useState, useMemo } from 'react'

import { useKanbanStore, stateType } from '.'
import Task from './Task'
import './Column.css'

function Column({ taskState }: { taskState: stateType }) {
  const [text, setText] = useState('')
  const [open, setOpen] = useState(false)
  const [drop, setDrop] = useState(false)

  const { tasks, addTask, moveTask, setDraggedTask, draggedTask } = useKanbanStore.getState()
  const columnStatetasks = useMemo(() => {
    return tasks.filter(task => task.state === taskState)
  }, [tasks, taskState])

  return (
    <div
      className={`column ${drop ? 'drop' : ''}`}
      onDragOver={e => {
        setDrop(true)
        e.preventDefault()
      }}
      onDragLeave={e => {
        setDrop(false)
        e.preventDefault()
      }}
      onDrop={() => {
        setDrop(false)
        moveTask(draggedTask as string, taskState)
        setDraggedTask(null)
      }}
    >
      <div className="titleWrapper">
        <p>{taskState}</p>
        <button onClick={() => setOpen(true)}>Add</button>
      </div>
      <div className="taskListWrapper">
        {columnStatetasks.map(({ id }) => (
          <Task key={id} id={id} />
        ))}
      </div>
      {open && (
        <div className="Modal">
          <div className="modalContent">
            <input autoFocus placeholder='new task...' onChange={e => setText(e.target.value)} value={text} />
            <button
              onClick={() => {
                addTask(text, taskState)
                setText('')
                setOpen(false)
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Column
