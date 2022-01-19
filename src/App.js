import Header from "./Components/Header";
import Tasks from "./Components/Tasks";
import AddTask from "./Components/AddTask";
import Footer from "./Components/Footer";
import { useState , useEffect } from "react"


const App = () => {

      const [showAddTask,setShowAddTask] = useState(false)

      const [tasks, setTasks] = useState([])

      // gettasks function takes data from fetch function and sts the task
      useEffect(() => {
        const getTasks = async () => {
          const tasksFromServer = await fetchTasks()
          setTasks(tasksFromServer)
        }
        
        getTasks()
      }, [])
     
      // it takes data from api converts it to json and then returns

      const fetchTasks = async () => {
          const res = await fetch('http://localhost:5000/tasks')
          const data = await res.json()
          return data          
      }

      // fetch only a single task for update
      const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await res.json()
        return data          
    }

    

    // to add a task
    const addTask = async (task) => {

      // server add task
      const res = await fetch('http://localhost:5000/tasks', 
      { method:'POST',
        headers: {
          'Content-type': 'application/json'
          },
        body: JSON.stringify(task),
      })

      const data = await res.json()
      setTasks([...tasks,data])


      // only ui part addtask
      // const id = Math.floor(Math.random() * 10000) + 1
      // const newTask = {id, ...task}
      // setTasks([...tasks,newTask])
    }   
  
    // to delete a task
    const deleteTask = async (id) => {

    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' } )

      setTasks(tasks.filter( (task)=>task.id !==id)) // show only those whose ids are not equal to id (to be deleted)
    }

    // to toggle reminder
    const togglereminder = async (id) => {
       
      const tasktoToggle = await fetchTask(id)
      const updTask = {...tasktoToggle, reminder: !tasktoToggle.reminder}

      const res = await fetch(`http://localhost:5000/tasks/${id}`,
      { 
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          },
          body: JSON.stringify(updTask),
      })

      const data = await res.json()
      // if taskid is equal then spread accross the task state with reminder set to opposite of previous else no change
      setTasks(
        tasks.map( (task) => 
          task.id === id ? { ...task, reminder: data.reminder } : task 
          )
        ) 
    }

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />

      {/* if showaddtask is true then show addtask (form) component */}
      {showAddTask && <AddTask onAdd={addTask} />} 

      { tasks.length > 0 ? // if tasks length is more then display task list
      ( <Tasks tasks = {tasks} onDelete={deleteTask} onToggle={togglereminder} /> ) // passing props to tasks.js
       : 
       ('No Tasks to Show') 
      }
      <Footer />
    </div>
  )
}

export default App;
