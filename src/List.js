import React from "react";
import { FaEdit, FaTrash } from 'react-icons/fa';
const List = ({items,EditItem,removeItem}) => {
  return (
    <div className='todo-list'>
        {items.map((item)=>{
        const {id,title} = item;
        return (
            <article className='todo-item' key={id}>
            <p className="title" >{title}</p>
            <div className='btn-container'>
            <button 
            className="edit-btn"
            type="button"
            onClick={()=> EditItem(id)}>
            <FaEdit/>
            </button>
            <button 
            className="delete-btn"
            type="button"
            onClick={()=> removeItem(id)}>
            <FaTrash/>
            </button>
            </div>
            </article>
            )
    })}
    </div>
  )
}

export default List