import { useState, useEffect } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

function App() {
  const getLocalStorage = () => {
    let list = localStorage.getItem('list')
    if(list){
      return JSON.parse(localStorage.getItem('list'))
    } else {
      return []
    }
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
      setName('')
      setIsEditing(false)
      setEditID(null)
    }
    setList([...list, newTask])
    setTask('')
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
        <div className="filters">
          <span className='active'>Todas</span>
          <span className='active'>Pendente</span>
          <span className='active'>Completa</span>
        </div>
        <button className='clear-btn' onClick={clearList}>Limpar</button>
      </div>
      <ul className='task-box'>
        {list.map((item) => {
          const {id, title} = item
          return (
            <li className='task' key={id}>
              <input type="checkbox"/>
              <p>{title}</p>
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
