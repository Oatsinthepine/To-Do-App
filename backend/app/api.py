from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS middleware to allow requests from the frontend
# origins = ["http://localhost:5173", "localhost:5173"]  # Add your frontend URL here

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods, you can specify a list of allowed methods
    allow_headers=["*"],  # Allows all headers, you can specify a list of allowed headers
)

@app.get("/", tags = ["Root"])
def read_root() -> dict:
    """
    Root endpoint to check if the API is running.
    """
    return {"message": "Welcome to the FastAPI application!"}

todos = [
    {"id": "1", "task": "watch tutorials"},
    {"id": "2", "task": "do a practice project"},
    {"id": "3", "task": "do leetcode problems"},
    {"id": "4", "task": "read documentation"},
    {"id": "5", "task": "build a portfolio"},
]

@app.get("/todos", tags=["Todos"])
def get_all_todos() -> list[dict]:
    """
    Get all todos.
    """
    return todos

@app.post("/todos", tags = ["Add Todo"])
async def add_task(new_task: dict) -> dict:
    """
    This is the backend end point for accepting post request from frontend by adding new task into todos
    :param new_task: expected a dictionary, this related to the frontend JSON.stringify({task}) to send a json string
    :return: dict
    """
    print(new_task)
    new_todo = {"id":str(len(todos) + 1), "task":new_task["task"]}
    todos.append(new_todo)
    return {"New todo added": new_todo}

@app.put("/todos/{id}")
async def update_todo(id: int, body:dict) -> dict:
    """
    This is the endpoint of update to_dos, which accept PUT request from the frontend
    :param id: id of the to-do
    :param body: The new task description
    :return: dict
    """
    for todo in todos:
        if int(todo["id"]) == id:
            todo["task"] = body["task"]
            return {
                "Success": f"Todo with id: {id} has updated", "updated to": todo
            }
    return {"Error": "Not found"}

@app.delete("/todos/{id}")
async def remove_todo(id: int) -> dict:
    """
    This is the endpoint for delete a to_do
    :param id: the id of the to_do
    :return: dict
    """
    for todo in todos:
        if int(todo["id"]) == id:
            todos.remove(todo)
            return {"Success": f"todo with id: {id} is removed.", "removed todo is: ": todo}
    return {"Error": "Not found"}