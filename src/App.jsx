import { useEffect, useState } from "react";

import "./App.css";
import { TodoProvider } from "./context/Todocontext";
import TodoForm from "./Components/TodoForm";
import TodoItem from "./Components/TodoItem";

function App() {
  const [todos, settodos] = useState([]);

  const addtodo = (todo) => {
    settodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updatetodo = (id, todo) => {
    settodos((prev) =>
      prev.map((prevtodo) => (prevtodo.id === id ? todo : prevtodo))
    );
  };

  const deleteTodo = (id) => {
    settodos((prev) => prev.filter((todo) => todo.id != id));
  };

  const togglecomplete = (id) => {
    settodos((prev) =>
      prev.map((prevtodo) =>
        prevtodo.id == id
          ? { ...prevtodo, completed: !prevtodo.completed }
          : prevtodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      settodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addtodo, deleteTodo, updatetodo, togglecomplete }}
    >
      <div className="bg-[#A6B1E1] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-[#424874] bg-[#DCD6F7]">
          <h1 className="text-3xl font-bold text-center mb-6 mt-2">
            Handle Your To-Do List
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
