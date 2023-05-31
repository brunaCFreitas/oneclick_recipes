import { Request, NextFunction, Response } from 'express';

import { verifyToken } from '../utils/auth';
import HttpException from '../utils/http.exception';

const authVerify = (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const { id, message } = verifyToken(authorization as string);

  if (!id) {
    throw new HttpException(401, message as string);
  }

  req.headers.idUser = id.toString();

  next();
};

export default authVerify;
