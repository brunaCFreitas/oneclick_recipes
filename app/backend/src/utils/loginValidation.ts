import { Login } from '../dtos/user/login.dto';
import HttpException from '../utils/http.exception';

const validate = ({ password, email }: Login): void => {
  const emailRegex = (/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i);
  const validateEmail = email.match(emailRegex);
  const validatePassword = password.length >= 6;

  if (!validateEmail || !validatePassword) {
    throw new HttpException(401, 'Invalid email or password');
  }
};

export default validate;
