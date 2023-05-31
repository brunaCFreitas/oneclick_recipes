import { Request, NextFunction, Response } from 'express';
import validate from '../utils/loginValidation';
import HttpException from '../utils/http.exception';

const userLoginVerify = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.body.email || !req.body.password) {
    throw new HttpException(400, 'All fields must be filled');
  }
  validate(req.body);

  next();
};

export default userLoginVerify;
