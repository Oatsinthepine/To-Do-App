from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS middleware to allow requests from the frontend
origins = ["http://localhost:5137", "localhost:5137"]  # Add your frontend URL here

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
