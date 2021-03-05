import Header from './components/Header'
import Tasks from './components/Tasks'
import { useState } from 'react'
import AddTask from "./components/AddTask";
//import React from 'react'

const App=() => {
  const [showAdd, setShowAdd] = useState(false)
  const [tasks, setTasks] = useState([
  ])
//Add Task
const addTask = (task) => {
  const id=Math.floor(Math.random() * 1000) + 1
  const newTask = {id, ...task}
  setTasks([...tasks, newTask])

}

// Delete Task
const deleteTask = (id) => {
  setTasks(tasks.filter(
    (task)=>task.id !== id)
    )
}

//Toggle Important
const toggleImportant = (id) => {
  setTasks(tasks.map((task)=> task.id === id ?
  { ...task, important : !task.important} : task))
}

  return ( //JSX - javascript syntax extention
    <div className="container"> 
      <Header 
        onAdd={()=> setShowAdd(!showAdd)} 
        btnOption={showAdd}
        title={'To do list: '}/>
      {showAdd && 
        <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? 
        (<Tasks tasks={tasks} 
          onDelete={deleteTask} 
          onToggle={toggleImportant}/>) : 
        ('Nothing to do at the moment...')}
    </div>
  );
}

export default App;
