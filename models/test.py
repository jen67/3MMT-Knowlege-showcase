import data.mongo_setup as mongo_setup
import services.data_service as svc


def main():
    mongo_setup.global_init()

    print(' ****************** REGISTER **************** ')

    name = input('Enter your name: ')
    email = input('Enter your email: ').strip().lower()
    skills = list(input('Enter your skills (space separated): ').split(' '))

    old_account = svc.find_user_my_email(email)
    if old_account:
        print(f"Error: Account with email {email} already exists.")
        return

    account = svc.create_account(name, email, skills)
    print(f"Created new account with id {account.id}.")


if __name__ == "__main__":
    main()