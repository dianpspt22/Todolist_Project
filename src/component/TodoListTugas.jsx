//import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { active, all, complete, checkboxTodo, editTodoList, deleteTodo } from '../redux/action/actionTodo';
import getTodos from "../redux/action/actionTodo";
import "./TodoList.css"

const TodoListTugas = () => {

    const { todolist, isLoading } = useSelector((state) => state)
    const filter = useSelector((state) => state.filter)
    const [ editTodo, setEditTodo ] = useState("")
    const [ editId, setEditId ] = useState(null)
    const dispatch = useDispatch()

    //filter
    const handleAll = () => {
        dispatch(all())
    }

    const handleActive = () => {
        dispatch(active())
    }

    const handleComplete = () => {
        dispatch(complete())
    }


    //button dan checkbox
    const handleCheckBox = (id) => {
        dispatch(checkboxTodo(id))
    }

    const handleInputEdit = (e) => {
        setEditTodo(e.target.value)
    }
    
    const handleEdit = (item) => {
        setEditId(item.id)
        setEditTodo(item.title)
    }

    const handleDelete = (id) => {
       dispatch(deleteTodo(id));
    }

    const updateTodo = () => {
        if (editTodo.trim() !== ""){
            dispatch(
                editTodoList({
                    id: editId,
                    title: editTodo
                })
            )
            setEditId(null)
            setEditTodo("")
        }
    }
    //console.log("TODO", todolist);
    //console.log("LOADING", isLoading);

    useEffect(() => {
        dispatch(getTodos());
    }, [])

    return(
        <>
        <div className="todoss">
            <div className="status">
                <div className="btn-all">
                    <button  onClick={handleAll}>ALL</button>
                </div>
                <div className="btn-active">
                    <button onClick={handleActive}>ACTIVE</button>
                </div>
                <div className="btn-complete">
                    <button onClick={handleComplete}>COMPLETE</button>
                </div>
            </div>

            {isLoading && <span>Loading...</span>}

            {todolist.filter((item) => {
                if(filter === "ACTIVE"){
                    return !item.isDone
                }else if(filter == "COMPLETE"){
                    return item.isDone
                }else{
                    return true
                }
            }).map((item) => (
                <div className="handle" key={item.id}>
                    <input  
                        className="check-todo"
                        type='checkbox'
                        checked={item.isDone}
                        onChange={() => handleCheckBox(item.id)}
                    />

                    {editId === item.id ? (
                        <div className="edit_todo">
                            <input 
                                className="update"
                                type='text'
                                value={editTodo}
                                onChange={handleInputEdit}
                            />
                            <button onClick={updateTodo}>Update</button>
                        </div>
                    ):(
                        <div className="tempat-data">
                            <span className="data-todo">{item.title}</span>
                            <div className="button-handle">
                                <button className="btn-edit" onClick={() => handleEdit(item)}>Edit</button>
                                <button className="btn-delete" onClick={() => handleDelete(item.id)}>Delete</button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
        </>
    )
}

export default TodoListTugas;