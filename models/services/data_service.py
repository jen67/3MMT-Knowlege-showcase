from typing import List

from data.users import User


def create_account(name: str, email: str, skills: List[int]) -> User:
    user = User()

    user.name = name
    user.email = email
    user.skills = skills

    user.save()
    return user


def find_user_my_email(email: str) -> User:
    user = User.objects(email=email).first()
    return user
