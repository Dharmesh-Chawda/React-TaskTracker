import Task from "./Task"   

const Tasks = ({ tasks , onDelete , onToggle}) => { // here it is receiving tasks from App component (main)
      return (
        <>
        {tasks.map((task) => (
            <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} /> // here it is passing task from tasks as prop to task.js
        ))}            
        </>
    )
}

export default Tasks
