import React, {useState, useEffect} from "react";

const ToDosContext = React.createContext({
    todos:[], fetchTodos: () => {},
});

// create functional component Todos
export default function ToDos() {
    const [todos, setTodos] = useState([]);
    // Function to fetch todos from the API
    const fetchTodos = async() => {
        try {
            const response = await fetch("http://localhost:8000/todos")
            const data = await response.json()
            setTodos(data)
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    }
    // useEffect to fetch todos when the component mounts
    useEffect(() => {
        fetchTodos()}, [])

    return (
        <ToDosContext.Provider value={{todos, fetchTodos}}>
            <div>
                <h2>To-Do List</h2>
                <ul>
                    {todos.map(todo => (
                        <li key={todo.id}>{todo.task}</li>
                    ))}
                </ul>
            </div>
        </ToDosContext.Provider>
    )
}