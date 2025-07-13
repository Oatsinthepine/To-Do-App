import React, { useState, useEffect } from "react";

// const ToDosContext = React.createContext({
//     todos:[], fetchTodos: () => {},
// });


export default function ToDos() {
    const [todos, setTodos] = useState([]);

    // Function to fetch todos from the API
    const fetchTodos = async() => {
        try {
            const response = await fetch("http://localhost:8000/todos")
            const data = await response.json()
            console.log("data", data)
            setTodos(data)
            console.log("task",todos)
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    }

    const [newTask, setNewTask] = useState("");
    // This function sends the POST request to the backend and add the new task
    const handleAdd = async () => {
            if (!newTask.trim()) {
                return;
            }
            try {
                await fetch("http://localhost:8000/todos", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    // This JSON.stringify({task}) is important, {task} will return {"task":"the actual value of task"}
                    // if I do this: JSON.stringify(task), it will returns me a plain text string, not json string, and this will encounter issue when sending to backend
                    body: JSON.stringify({"task":newTask})
                })
                setNewTask("");
                fetchTodos()
            } catch (error) {
                console.log("Failed to add task:", error)
            }
        }

    const [taskId, setTaskId] = useState("")
    const [updateTask, setUpdatedTask] = useState("");
    const handleUpdate = async() => {
        if (!taskId.trim() || !updateTask.trim()) {
            return
        }
        try {
            // when PUT (update), better to use past parameter which is more suitable for openAPI standard, and clear. Not the query parameter
            await fetch(`http://localhost:8000/todos/${taskId}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({"task":updateTask})
            });
            setUpdatedTask("")
            fetchTodos();
        } catch (error) {
            console.log("error when update", error)
        }

    }

    // const [removeTask, setRemoveTask] = useState("")
    const handleRemove= async () => {
        if (!taskId.trim()) {
            return
        }
        try {
            // when PUT (update), better to use past parameter which is more suitable for openAPI standard, and clear. Not the query parameter
            await fetch(`http://localhost:8000/todos/${taskId}`, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
            });
            setTaskId("")
            fetchTodos();
        } catch (error) {
            console.log("error when update", error)
        }

    }

    // useEffect to fetch todos when the component mounts
    // this is very important to use the useEffect hook here, because in the React-Js To_Do app practice (which is the pure front-end version of this app)
    // all the data(tasks) are stored and update directly in the frontend using useState, it does not fetch anything from an external source.
    //However, in this full-stack version, we are fetching the data from the backend API, so must use fetch() to pull that data into the frontend — and you do this inside useEffect so that it runs once when the component mounts.
    // without the useEffect, the fetchTodos function would never be called, and the todos state would remain empty.
    useEffect(() => {
         fetchTodos()}, [])

    return (
        // <ToDosContext.Provider value={{todos, fetchTodos}}>
            <div>
                {/* Here below is the ordered list displaying all the fetched todos from backend */}
                <h2>To-Do List</h2>
                <ol>
                    {todos.map((todo) => {
                        return(
                            <li key={todo.id}>
                                {todo.task}
                            </li>
                        )
                    })}
                </ol>
                {/* Here below is the input field for adding a new todos*/}
                <div>
                    <input type="text" placeholder="Please enter a new task..." value={newTask} onChange={(e) => setNewTask(e.target.value)}/>
                    <button onClick={handleAdd}>
                        Add task
                    </button>
                </div>
                {/* This below is the update form used to update tasks */}
                <div>
                    <form onSubmit={
                        (e) => {
                            e.preventDefault();
                            handleUpdate();
                        }
                    }>
                        <label>To-Do ID</label>
                        <input type = "number" placeholder="enter the id of to-do" onChange={(e) => setTaskId(e.target.value)}/>
                        <br/>
                        <label>updated to-do</label>
                        <input type="text" placeholder="the updated to-do" onChange={(e) => setUpdatedTask(e.target.value)}/>
                        <br/>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
                {/*This below is the delete for removing the task*/}
                <div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleRemove();
                        }}>
                        <label>To-Do ID to remove</label>
                        <input type = "number" placeholder="enter the id of to-do" onChange={(e) => setTaskId(e.target.value)}/>
                        <br/>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        // </ToDosContext.Provider>
    )
}
