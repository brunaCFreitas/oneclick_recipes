import { sign, verify } from 'jsonwebtoken';

const secretkey = process.env.JWT_SECRET || 'insecure';

interface ITokenId {
  id:number
  message?: string
}

const createToken = (id: number) => {
  const data = {
    id,
  };

  return sign(
    data,
    secretkey,
    {
      expiresIn: '1d',
      algorithm: 'HS256',
    },
  );
};

const decodeToken = (token: string) : ITokenId => {
  const decode = verify(token, secretkey);
  return decode as ITokenId;
};

const verifyToken = (token: string): ITokenId => {
  try {
    const validate = verify(token, secretkey);
    return validate as ITokenId;
  } catch (e) {
    return { message: 'Token must be a valid token', id: 0 };
  }
};

export { createToken, decodeToken, verifyToken };
