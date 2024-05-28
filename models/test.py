import data.mongo_setup as mongo_setup
import services.data_service as svc
import io
from data.mongo_setup import global_init

global_init()


def main():
    mongo_setup.global_init()

    print(' ****************** REGISTER **************** ')

    name = input('Enter your name: ')
    email = input('Enter your email: ').strip().lower()
    mobile = input('Enter Your Phone Number: ')
    password = input('Enter Your Password: ')
    category = input('Enter Your job category: ')
    skills = list(input('Enter your skills (space separated): ').split(' '))

    old_account = svc.find_user_my_email(email)
    if old_account:
        print(f"Error: Account with email {email} already exists.")
        return

    user = svc.create_account(name, email, mobile, password, category, skills)
    print(f"Created new account with id {user.id}.")

    print(' ****************** REGISTER Company **************** ')

    company_name = "wefind"
    company_email = "wefind@mail.com"
    location = "silicon valley"
    industry = "tech"
    description = "leading company in tech"

    company = svc.create_company(
        company_name, company_email, location, industry, description)
    print(f"Created new company with id {company.id}.")


    print(' ****************** Resume **************** ')

    resume_content = "This is a sample resume."
    resume = svc.create_resume(user, company, resume_content)
    print(f"Created new resume with id {resume.id}.")


if __name__ == "__main__":
    main()