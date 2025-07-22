from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.auth import signup, login  # 👈 make sure both are imported

app = FastAPI()

# Allow CORS (you probably already have this)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 👇 Make sure both routes are included
app.include_router(signup.router, prefix="/api/auth")
app.include_router(login.router, prefix="/api/auth")
