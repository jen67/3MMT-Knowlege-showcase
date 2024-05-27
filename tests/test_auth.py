import json
import unittest
from unittest.mock import patch, MagicMock
from api.v1.auth.session_auth import Auth, _hash_password, _generate_uuid

class TestAuth(unittest.TestCase):
    def setUp(self):
        self.auth = Auth()

    @patch('your_module.bcrypt.hashpw')
    def test_hash_password(self, mock_hashpw):
        password = "testpassword"
        mock_hashpw.return_value = b"hashedpassword"
        hashed = _hash_password(password)
        self.assertEqual(hashed, "hashedpassword")

    @patch('your_module.uuid.uuid4')
    def test_generate_uuid(self, mock_uuid):
        mock_uuid.return_value = "1234-5678"
        uuid = _generate_uuid()
        self.assertEqual(uuid, "1234-5678")

    @patch('your_module.User')
    @patch('your_module.Company')
    def test_register_user(self, MockCompany, MockUser):
        mock_user_instance = MockUser.return_value
        mock_company_instance = MockCompany.return_value
        
        user_data = {
            'name': 'testuser',
            'email': 'user@test.com',
            'password': 'password123',
            'mobile': '1234567890',
            'category': 'developer'
        }

        company_data = {
            'name': 'testcompany',
            'email': 'company@test.com',
            'password': 'password123',
            'location': 'Somewhere',
            'industry': 'Tech',
            'description': 'A test company'
        }

        # Test user registration
        with patch.object(self.auth, '_save_to_redis') as mock_save_to_redis:
            user = self.auth.register_user(user_data, is_company=False)
            self.assertIsInstance(user, MockUser)
            mock_save_to_redis.assert_called_with(mock_user_instance, is_company=False)
            MockUser.assert_called_once_with(name='testuser', email='user@test.com', mobile='1234567890', password=mock_user_instance.password, category='developer')

        # Test company registration
        with patch.object(self.auth, '_save_to_redis') as mock_save_to_redis:
            company = self.auth.register_user(company_data, is_company=True)
            self.assertIsInstance(company, MockCompany)
            mock_save_to_redis.assert_called_with(mock_company_instance, is_company=True)
            MockCompany.assert_called_once_with(name='testcompany', email='company@test.com', location='Somewhere', industry='Tech', description='A test company', password=mock_company_instance.password)

    @patch('your_module.Auth._redis')
    def test_valid_login(self, mock_redis):
        email = 'user@test.com'
        password = 'password123'
        hashed_password = _hash_password(password)
        user_data = {
            'email': email,
            'password': hashed_password
        }
        mock_redis.get.return_value = json.dumps(user_data)
        self.assertTrue(self.auth.valid_login(email, password))

        mock_redis.get.return_value = None
        self.assertFalse(self.auth.valid_login(email, password))

    @patch('your_module.Auth._redis')
    @patch('your_module._generate_uuid')
    def test_create_session(self, mock_generate_uuid, mock_redis):
        email = 'user@test.com'
        session_id = 'new-session-id'
        mock_generate_uuid.return_value = session_id
        user_data = {
            'email': email,
            'session_id': None,
            'is_company': False
        }
        mock_redis.get.return_value = json.dumps(user_data)
        session = self.auth.create_session(email)
        self.assertEqual(session, session_id)
        updated_user_data = json.loads(mock_redis.set.call_args[0][1])
        self.assertEqual(updated_user_data['session_id'], session_id)

    @patch('your_module.Auth._redis')
    def test_get_user_from_session_id(self, mock_redis):
        session_id = 'session-id'
        user_data = {
            'id': 'user-id',
            'session_id': session_id,
            'is_company': False
        }
        mock_redis.keys.return_value = [b'user:user@test.com']
        mock_redis.get.return_value = json.dumps(user_data)
        
        with patch('your_module.User.objects') as mock_user_objects:
            mock_user_objects.return_value.first.return_value = 'mock_user'
            user = self.auth.get_user_from_session_id(session_id)
            self.assertEqual(user, 'mock_user')

    @patch('your_module.Auth._redis')
    def test_destroy_session(self, mock_redis):
        email = 'user@test.com'
        user_data = {
            'email': email,
            'session_id': 'session-id',
            'is_company': False
        }
        mock_redis.get.return_value = json.dumps(user_data)
        self.auth.destroy_session(email)
        updated_user_data = json.loads(mock_redis.set.call_args[0][1])
        self.assertIsNone(updated_user_data['session_id'])

    @patch('your_module.Auth._redis')
    @patch('your_module._generate_uuid')
    def test_get_reset_password_token(self, mock_generate_uuid, mock_redis):
        email = 'user@test.com'
        reset_token = 'reset-token'
        mock_generate_uuid.return_value = reset_token
        user_data = {
            'email': email,
            'reset_token': None,
            'is_company': False
        }
        mock_redis.get.return_value = json.dumps(user_data)
        token = self.auth.get_reset_password_token(email)
        self.assertEqual(token, reset_token)
        updated_user_data = json.loads(mock_redis.set.call_args[0][1])
        self.assertEqual(updated_user_data['reset_token'], reset_token)

    @patch('your_module.Auth._redis')
    def test_update_password(self, mock_redis):
        reset_token = 'reset-token'
        new_password = 'newpassword123'
        hashed_password = _hash_password(new_password)
        user_data = {
            'email': 'user@test.com',
            'reset_token': reset_token,
            'is_company': False,
            'password': 'oldpassword'
        }
        mock_redis.keys.return_value = [b'user:user@test.com']
        mock_redis.get.return_value = json.dumps(user_data)
        self.auth.update_password(reset_token, new_password)
        updated_user_data = json.loads(mock_redis.set.call_args[0][1])
        self.assertEqual(updated_user_data['password'], hashed_password)
        self.assertIsNone(updated_user_data['reset_token'])

    @patch('your_module.Auth.get_user_from_session_id')
    def test_validate_user_by_session_id(self, mock_get_user_from_session_id):
        session_id = 'session-id'
        mock_get_user_from_session_id.return_value = 'mock_user'
        self.assertTrue(self.auth.validate_user_by_session_id(session_id))
        mock_get_user_from_session_id.return_value = None
        self.assertFalse(self.auth.validate_user_by_session_id(session_id))

if __name__ == '__main__':
    unittest.main()

