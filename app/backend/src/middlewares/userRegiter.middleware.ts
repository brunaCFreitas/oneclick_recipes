import { NextFunction, Request, Response } from 'express';
import registerSchema from '../joi/user.schema';
import HttpException from '../utils/http.exception';

const regiterVerify = (req: Request, _res: Response, next: NextFunction) => {
  const { error } = registerSchema.validate(req.body);

  if (error) { throw new HttpException(400, error.message); }

  next();
};

export default regiterVerify;
