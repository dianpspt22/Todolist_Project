import { applyMiddleware, createStore } from "redux"
import todoListReducer from "./reducer/todoListReducer";
import thunk from "redux-thunk"

const storeTodo = createStore(todoListReducer, applyMiddleware(thunk))

export default storeTodo;
