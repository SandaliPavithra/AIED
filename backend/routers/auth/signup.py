from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from database import users_collection  # adjust path as needed

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class SignupModel(BaseModel):
    full_name: str
    email: EmailStr
    password: str

@router.post("/signup")
async def create_user(user: SignupModel):
    if await users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already exists")

    hashed_pw = pwd_context.hash(user.password)
    user_data = {
        "full_name": user.full_name,
        "email": user.email,
        "password": hashed_pw,
    }

    await users_collection.insert_one(user_data)
    return {"message": "User created successfully"}
