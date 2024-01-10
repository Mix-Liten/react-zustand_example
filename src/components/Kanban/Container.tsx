import Column from './Column'
import './Kanban.css'

function Container() {
  return (
    <div className="kanban">
      <Column taskState="Planned" />
      <Column taskState="Ongoing" />
      <Column taskState="Done" />
    </div>
  )
}

export default Container
