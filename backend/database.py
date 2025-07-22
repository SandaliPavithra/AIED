from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
import certifi

load_dotenv()

client = AsyncIOMotorClient(
    os.getenv("MONGODB_URL"),
    tlsCAFile=certifi.where()
)
db = client[os.getenv("DB_NAME")]

users_collection = db.users