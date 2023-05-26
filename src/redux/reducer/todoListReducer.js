import { ACTIVE, ALL, CHECKBOX_TODO, COMPLETE, DELETE_TODO, EDIT_TODO, START_FETCHING } from "../action/actionTodo"
import { SUCCESS_GET_TODO } from "../action/actionTodo"

const initialState = {
    todolist: [],
    isLoading: false
}

const todoListReducer = (state = initialState, action) => {
    switch(action.type){
        case START_FETCHING:
            return {
                ...state,
                isLoading: true
            }
        case SUCCESS_GET_TODO:
            return{
                isLoading: false,
                todolist: [...action.payload]
            }
        case CHECKBOX_TODO:
            return{
                ...state,
                todolist: state.todolist.map((item) => (item.id === action.payload ? {...item, isDone: !item.isDone} : item))
            }
        case DELETE_TODO:
            return {
                ...state,
                todolist: state.filter(item => item.id !== action.payload)
            }
        case EDIT_TODO:
            return{
                ...state,
                todolist: state.todolist.map((item) => (item.id === action.payload.id ? {...item, title: action.payload.title} : item))
            }
        case ALL:
            return{
                ...state,
                filter: "ALL"
            }
        case ACTIVE:
            return{
                ...state,
                filter: "ACTIVE"
            }
        case COMPLETE:
            return{
                ...state,
                filter: "COMPLETE"
            }
        default: return state
    }
}
export default todoListReducer