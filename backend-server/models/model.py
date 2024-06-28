from config import app
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, TIMESTAMP, ForeignKey
from sqlalchemy.orm import relationship

db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_name = Column(String(200))
    user_address = Column(String(200))
    user_city = Column(String(200))
    user_phone = Column(String(10))
    process_status = Column(String(10))
    date_created = Column(TIMESTAMP)
    
    def json(self) -> dict:
        return {
            "id": self.id,
            "name": self.user_name,
            "addr": self.user_address,
            "city": self.user_city,
            "phone": self.user_phone,
            "process_status": self.process_status,
            "date_created": self.date_created
        }
    def __repr__(self) -> str:
        return f"{self.json()}"

class Group(db.Model):
    __tablename__ = "user_relationship"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_relationship = Column(String(500))
        
    def json(self) -> dict:
        return {
            "user_relationship": self.user_relationship
        }
    def __repr__(self) -> str:
        return f"{self.json()}"
    