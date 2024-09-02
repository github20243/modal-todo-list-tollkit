import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: []
}

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state,{payload}) => {
            state.todos.push(payload)
        },
        deleteTodo: (state, {payload}) => {
            state.todos = state.todos.filter((todo) =>todo.id !== payload)
        },
        editTodo: (state,{payload}) => {
            const {id,text,url,date} = payload
            const todo = state.todos.find((todo) => todo.id === id)
            if(todo) {
                todo.text = text
                todo.url = url
                todo.date = date
            }
        }
    }
})

export const {addTodo,deleteTodo,editTodo} = todoSlice.actions
export default todoSlice