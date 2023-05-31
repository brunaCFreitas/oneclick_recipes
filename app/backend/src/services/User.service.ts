import { compare, genSalt, hash } from 'bcryptjs';
import HttpException from '../utils/http.exception';
import { createToken } from '../utils/auth';
import UserModel, { UserAttributes, UserCreateAttr } from '../database/models/User.model';

export type Login = {
  email: string;
  password: string;
};

const SALT = process.env.SALT || 10;

export default class UserService {
  public static async login({ email, password }: Login) {
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      throw new HttpException(401, 'Invalid email or password');
    }
    const checkPassword = await compare(password, user.password);
    if (!checkPassword) {
      throw new HttpException(401, 'Invalid email or password');
    }
    return {
      token: createToken(user.id),
      email: user.email,
    };
  }

  public static async register({ email, password, username }: UserCreateAttr) {
    if (await this.getUserByemail(email)) {
      throw new HttpException(400, 'Email already registered');
    }
    const salt = await genSalt(+SALT);
    const passwordHash = await hash(password, salt);
    const user: UserAttributes = await UserModel
      .create({ email, password: passwordHash, username });
    return {
      token: createToken(user.id),
      email: user.email,
    };
  }

  static async getUserByemail(email: string): Promise<UserAttributes | null> {
    return UserModel.findOne({ where: { email } });
  }
}
