from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS middleware to allow requests from the frontend
origins = ["http://localhost:5173", "localhost:5173"]  # Add your frontend URL here

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
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

