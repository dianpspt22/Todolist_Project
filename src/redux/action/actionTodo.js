import axios from "axios"

export const START_FETCHING = "START_FETCHING"
export const GET_TODO = "GET_TODO"
export const SUCCESS_GET_TODO = "SUCCESS_GET_TODO"
export const ADD_TODO = "ADD_TODO"
export const DELETE_TODO = "DELETE_TODO"
export const CHECKBOX_TODO = "CHECKBOX_TODO"
export const EDIT_TODO = "EDIT_TODO"
export const ALL = "ALL"
export const ACTIVE = "ACTIVE"
export const COMPLETE = "COMPLETE"

const startFetching = () => {
    return{
        type: START_FETCHING
    }
}

const successGetTodo = (payload) => {
    return{
        type: SUCCESS_GET_TODO,
        payload
    }
}

export const getTodos = () => {
    return async (dispacth) => {

        dispacth(startFetching())

        const api ="https://6455446cf803f345763ef5b5.mockapi.io/api/TodoList"
        const result = await axios(api)

        dispacth(successGetTodo(result.data))
    }
}

export const addTodo = (newTodo) => async (dispacth) =>{
    const api ="https://6455446cf803f345763ef5b5.mockapi.io/api/TodoList"
    await axios.post(api, newTodo)

    dispacth(getTodos())
}

export const checkboxTodo = (id) => ({
    type: CHECKBOX_TODO,
    payload: id
})

export const deleteTodo = (id) => async (dispacth) => {
    await axios.delete(`https://6455446cf803f345763ef5b5.mockapi.io/api/TodoList/${id}`);
    dispacth(getTodos())
}

export const confirmDeleteTodo = (id) => {
    return{
        type: DELETE_TODO,
        payload: id
    }
}


export const editTodoList = (item) => ({
    type: EDIT_TODO,
    payload: item
})

export const all =() => ({
    type: ALL
})

export const active = () => ({
    type: ACTIVE
})

export const complete = () => ({
    type: COMPLETE
})

//export const deleteTodo = createAsyncThunk('todolist/deleteTodo', async (id) => {
   // await axios.delete(`https://api.example.com/todos/${id}`);
    //return id;
  //});

export default getTodos;