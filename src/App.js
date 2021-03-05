import Header from './components/Header'
import Tasks from './components/Tasks'
import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import AddTask from "./components/AddTask";
//import React from 'react'
import Footer from './components/Footer'
import About from './components/About'

const App=() => {
  const [showAdd, setShowAdd] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async() => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  //fetch task

const fetchTasks = async() => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
}


//Add Task no server 
/*
const addTask = (task) => {
  const id=Math.floor(Math.random() * 1000) + 1
  const newTask = {id, ...task}
  setTasks([...tasks, newTask])
}
*/
//Add Task Server
const addTask = async (task) => {
  const res = await fetch('http://localhost:5000/tasks/', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    }, 
    body: JSON.stringify(task),
  })
  const data = await res.json()
  setTasks([...tasks, data])
}

// Delete Task
const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE',
  })
  setTasks(tasks.filter(
    (task)=>task.id !== id)
    )
}

//Toggle Important
const toggleImportant = async (id) => {
  const taskToUpdate = await fetchTask(id)
  const updateTask = { ...taskToUpdate, important: !taskToUpdate.important}

  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    }, 
    body: JSON.stringify(updateTask),
  })

  const data = await res.json()

  setTasks(tasks.map((task)=> task.id === id ?
  { ...task, important : !data.important} : task))
}

//fetch task singular
const fetchTask = async(id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()
  return data
}

  return ( //JSX - javascript syntax extention
    <Router>
    <div className="container"> 
      <Header 
        onAdd={()=> setShowAdd(!showAdd)} 
        btnOption={showAdd}
        title={'To do list: '}/>
      
      <Route path='/' exact render={(props)=> (
        <>
          {showAdd && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? 
        (<Tasks tasks={tasks} 
          onDelete={deleteTask} 
          onToggle={toggleImportant}/>) : 
        ('Nothing to do at the moment...')}
        </>
      )} />
      <Route path="/about" component={About} />
      <Footer />
    </div>
    </Router>
  );
}

export default App;
