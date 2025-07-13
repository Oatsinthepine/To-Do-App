# To-Do-App

Project structure is organized as follows:

- README.md: Documentation for your project.
- backend/: Contains all backend-related code.
- main.py: Entry point for running the FastAPI server.
- app/: A package for your FastAPI application code.
- __init__.py: Marks app as a Python package.
- api.py: Intended to define your FastAPI app and API routes (currently empty).


## Why this structure?

Separation of concerns: Backend code is isolated in the backend/ directory, making it easier to manage and scale.

Modularity: The app/ subpackage allows you to organize your API logic, models, and other components separately.

Entry point clarity: main.py is the script to launch your server, keeping startup logic separate from API definitions.

Scalability: As your app grows, you can add more modules (e.g., models.py, schemas.py, routes/) inside app/ without cluttering the root directory.

This structure is common in FastAPI projects and helps maintain clean, maintainable, and scalable code.


## Detailed explain of `React.createContext()` in ToDo.jsx

In this current practice, I commented out the 
`// const ToDosContext = React.createContext({
//     todos:[], fetchTodos: () => {},
// });` in the `ToDos()` function, also commented out this `<ToDosContext.Provider value={{todos, fetchTodos}}> </ToDosContext.Provider>`

The code still works fine, this is because in this practice **everything is inside the ToDos() component**, 

	•	All the logic (fetchTodos, handleAdd, handleUpdate) and state (todos, task, etc.) live in the same place.
	•	No other component needs to access those values “from afar”.
	•	So, props are not being passed down, and no context is needed.

But if I refactor the practice by break it into separate components, I will need to use the `const { fetchTodos } = React.useContext(ToDosContext)`
within each individual components. 

## Example:

if I refactor like this:
```jsx
function ToDos() {
  const [todos, setTodos] = useState([]);
  const fetchTodos = () => { /* whatever inside */}

  return (
    <ToDosContext.Provider value={{ todos, fetchTodos }}>
      <TodoList />
      <AddTodoForm />
    </ToDosContext.Provider>
  );
}
```

Then in `AddTodoForm.jsx`, I need to:
```jsx
import { useContext } from 'react';
import { ToDosContext } from './ToDosContext';

function AddTodoForm() {
  const { fetchTodos } = useContext(ToDosContext);
  // continue
}
```

so Context — global sharing of state/functions without messy props.