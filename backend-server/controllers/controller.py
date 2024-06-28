from models.model import db, User, Group
from sqlalchemy import desc, update, or_
from sqlalchemy.exc import SQLAlchemyError, NoResultFound
from config import app

class UserService:
    def create(self, user: User):
    
        db.session.add(user)
        db.session.commit()
        return user

    def retrieve_user_by_records(self, name: str, address: str, city: str, phone: str):
        print("this is name", name)
        conditions = []
        if name:
            conditions.append(User.user_name.ilike(f'%{name}%'))
        if address:
            conditions.append(User.user_address.ilike(f'%{address}%'))
        if city:
            conditions.append(User.city.ilike(f'%{city}%'))
        if phone:
            conditions.append(User.user_phone.ilike(f'%{phone}%'))
        if conditions:
            query = db.session.query(User).filter(or_(*conditions))
        else:
            query = db.session.query(User)

        res = query.first()
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