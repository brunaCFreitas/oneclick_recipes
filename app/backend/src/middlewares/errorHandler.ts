import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/http.exception';

export default function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const { status, message } = err as HttpException;
  res.status(status || 500).json({ message });
}
