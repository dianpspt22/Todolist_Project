import { addTodo } from "../redux/action/actionTodo";
import { useDispatch } from "react-redux"
import { useState } from "react";
import "./TodoList.css"

const AddTodoForm = () => {
    const [inputTodo, setInputTodo] = useState("")
    const dispatch = useDispatch() 
   
    const handleSubmit = (e) => {
        e.preventDefault();

        let newTodo = {
            title: inputTodo,
            isDone: false,
        }

        dispatch(addTodo(newTodo))
        setInputTodo("")
    }
    
    return(
        <>
        <div className="form-todo">
        <h1>What is the plan for today?</h1>
           <form className="form-input" onSubmit={handleSubmit} action="add-data">
                <input 
                    type="text"
                    value={inputTodo}
                    placeholder="What to do?"
                    onChange={(e) => setInputTodo(e.target.value)}
                />
                <button className="button">add</button>
           </form>
        </div>
        </>
    )
}

export default AddTodoForm;