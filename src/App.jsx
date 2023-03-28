import { useState, useEffect } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

function App() {
  const getLocalStorage = () => {
    let list = localStorage.getItem('list')
    if(list){
      list  = JSON.parse(localStorage.getItem('list'))
    } else {
      list = []
    }
    return list
  }

  const [task, setTask] = useState('')
  const [list, setList] = useState(getLocalStorage)
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)  

  const handleSubmit = (e) => {
    e.preventDefault()
    const newTask = {
      id: new Date().getTime().toString(),
      title: task,
      completed: false
    }
    if(!task){
      alert('vazio')
    }
    if(task && isEditing){
      setList(list.map((item) => {
        if(item.id === editID){
          return {...task, title: task}
        }
        return item
      }))
      setTask('')
      setIsEditing(false)
      setEditID(null)
    } else {
      setList([...list, newTask])
      setTask('')      
    }
  }
 

  const editTask = (id) => {
    const taskEdit = list.find((task) => task.id === id)
    setIsEditing(true)
    setEditID(id)
    setTask(taskEdit.title)
  }

  const deleteTask = (id) => {
    setList(list.filter((item) => item.id !== id))
  }

  const clearList = () => {
    setList([])
  }

  const updateStatus = (id) => {
    const newItems = list.map((item) => {
      if(item.id === id){
        const newItem = {...item, completed: !item.completed}
        return newItem
      }
      return item
    }) 
    setList(newItems)
   
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])
  


  return (
    <div className="wrapper">
      <form className="task-input" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder='Adicionar nova tarefa'
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        {/* <button type="submit">add</button> */}
      </form>
      <div className="controls">        
        <button className='clear-btn' onClick={clearList}>Limpar</button>
      </div>
      <ul className='task-box'>
        {list.map((item) => {
          const {id, title, completed} = item
          return (
            <li className='task' key={id}>
              <div className='task-name'>
                <input type="checkbox" checked={completed} onChange={() => updateStatus(id)}/>
                <p className={completed && 'checked'}>{title}</p>
              </div>
              <div className="btn-container">
                <button className='edit-btn' onClick={() => editTask(id)}><FaEdit/></button>
                <button className='delete-btn' onClick={() => deleteTask(id)}><FaTrash/></button>
              </div>
            </li>
          )
        })}
          
        
      </ul>      
    </div>
  )
}

export default App
