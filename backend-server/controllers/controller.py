from models.model import db, User, Group
from sqlalchemy import desc, update
from sqlalchemy.exc import SQLAlchemyError, NoResultFound
from config import app

class UserService:
    def create(self, user: User):
    
        db.session.add(user)
        db.session.commit()
        return user

    def retrieve_user_by_name(self, name: str):
        print("this is name", name)
        res = db.session.query(User).filter(User.user_name.ilike(f'%{name}%')).first()
        print("this is result", res)
        return res
    
    def update_existing_user_details(self, user: User):
        stmt = (
            update(User)
            .where(User.id == user.id)
            .values(
                name=user.user_name,
                addr=user.user_address,
                city=user.user_city,
                phone=user.user_phone
            )
        )
        db.session.execute(stmt)
        db.session.commit()
        return user
    
    def retrieve_user_relationships(self):
        res = db.session.execute(db.select(Group.id, Group.user_relationship).order_by(
                Group.id)).fetchall()
        return res