import { createContext, useContext } from "react";

export const Todocontext=createContext({
    todos:[
        {
            id: 1,
            todo:"hey",
            completed: false
        },{}
       

    ],
    addtodo:(todo)=>{},
    deleteTodo:(id)=>{},
    updatetodo:(id,todo)=>{},
    togglecomplete:(id)=>{}



})

export const TodoProvider=Todocontext.Provider;
export const useTodo=()=>{
    return useContext(Todocontext)
}




