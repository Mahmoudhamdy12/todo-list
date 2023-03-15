import React, { useEffect, useState } from 'react'
import List from './List'
import Alert from './Alert'
import { AiTwotoneBulb } from 'react-icons/ai';


function App() {
const [name,setName] = useState('');
const [list,setList] = useState([]);
const [isEditing,setIsEditing] = useState(false);
const [editId,setEditId] = useState(null);
const [alert,setAlert] = useState({show:false,type:'success' ,msg:'hello'})

const handelSubmit = (e) => {
  e.preventDefault()
  // name is empty 
  if(!name){
showAlert(true,'success' ,'Please Enter Value')
// edit item
}else if(name && isEditing){
  setList(
    list.map((item)=>{
      if(item.id === editId){
        return {...item,title:name}
      }
      return item
    })
    )
    showAlert(true,'success' ,'Value Changed')
    setName('')
    setIsEditing(false)
    setEditId(null)
  
}else {
  showAlert(true,'success' ,'Item Added To The List')
  const newItem = {id: new Date().getTime().toString(),title:name}
  setList([...list,newItem]);
  setName('')
}
}

const showAlert = (show=false, type= '', msg = '') => setAlert({show,type ,msg})

const removeAll = ()=> {
  setList([])
  showAlert(true,'danger','Empty List')
  setName('')
}
const editItem = (id)=> {
  const specificItem = list.find((item)=> item.id === id);
  setIsEditing(true)
  setEditId(id)
  setName(specificItem.title)
}
const removeItem = (id) => {
  setList(list.filter((item)=> item.id !== id))
  showAlert(true,'danger','Item Removed')
}
// light mode
const [theme, setTheme] = useState('light')
const toggleTheme = ()=> {
  if(theme === 'light') {
    setTheme('dark')
  } else {
    setTheme('light')
  }
}


  return (
            <section className={`section-center ${theme}`}>
              <button className='mode' onClick={toggleTheme} ><AiTwotoneBulb/></button>
                <form  className='items-form' onSubmit={handelSubmit}>
                    {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} /> }
                    <h3>Todo List</h3>
                    <div className='form-control'>
                    <input 
                    type='text' 
                    className='todo' 
                    placeholder='Todo' 
                    value={name} onChange={(e)=> setName(e.target.value)} 
                    />
                    <button type='submit' className='submit-btn'>
                    {isEditing ? 'Edit' : 'Submit'}
                    </button>
                    </div>
                </form>
                {list.length > 0 && (
                <div className='items-container'>
                    <List items={list} EditItem={editItem} removeItem={removeItem}/>
                    <button className='clear-btn' onClick={removeAll}>
                    Clear Items
                    </button>
                </div>
              )}
            </section>
  )
}

export default App
