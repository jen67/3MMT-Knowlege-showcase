import data.mongo_setup as mongo_setup
import services.data_service as svc
from data.users import User
from data.recruiter import Company
from data.resumes import Resume
import io
import logging

# Set up logging configuration
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)
mongo_setup.global_init()


def test_registration_and_resume_submission():
    # Drop existing collections

    print(' ****************** REGISTER **************** ')

    name = "Alice Johnson"
    email = "alice@example.com"
    mobile = "+2489722"
    password = "12345"
    category = "backend"
    skills = ["Python", "Data Analysis"]

    # old_account = svc.find_user_my_email(email)
    # if old_account:
    #     print(f"Error: Account with email {email} already exists.")
    #     return

    account = svc.create_account(name, email, mobile, password, category, skills)
    print(f"Created new account with id {account.id}.")

    print(' ************ COMPANY REGISTRATION ************ ')

    company_data = [
        {"name": "Tech Innovators", "email": "info@techinnovators.com", "location": "San Francisco, CA", "industry": "Software", "description": "Innovative solutions in tech."},
        {"name": "Health Corp", "email": "contact@healthcorp.com", "location": "New York, NY", "industry": "Healthcare", "description": "Healthcare services and products."}
    ]

    companies = []
    for data in company_data:
        try:
            company = svc.create_company(data['name'], data['email'], data['location'], data['industry'], data['description'])
            companies.append(company)
            logger.info(f"Company {company.name} saved successfully.")  # Log success message
        except Exception as e:
            logger.error(f"Error occurred while creating company: {str(e)}")  # Log error message

    print(' ************ RESUME SUBMISSION ************ ')

    resume_content = b"This is a sample resume."
    resume_file = io.BytesIO(resume_content)

    submitted_resume = svc.create_resume(account, companies[0], resume_file)

    all_companies = Company.objects()
    print("List of Companies:")
    for company in all_companies:
        print(f"ID: {company.id}, Name: {company.name}, Email: {company.email}, Location: {company.location}")

    all_users = User.objects()
    print("\nList of Users:")
    for user in all_users:
        print(f"ID: {user.id}, Name: {user.name}, Email: {user.email}")

    resumes_for_company = Resume.get_resumes_for_company(companies[0])
    print("\nList of Resumes for Company ID", companies[0].id)
    for resume in resumes_for_company:
        print(f"Resume ID: {resume.id}, User: {resume.user.name}, Submitted Date: {resume.submitted_date}")

if __name__ == "__main__":
    test_registration_and_resume_submission()

