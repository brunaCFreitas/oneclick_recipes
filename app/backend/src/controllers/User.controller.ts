import { Request, Response } from 'express';
import UserService from '../services/User.service';

export default class UserController {
  public static async login(req: Request, res: Response) {
    const data = await UserService.login(req.body);

    res.status(200).json(data);
  }

  public static async register(req: Request, res: Response) {
    const data = await UserService.register(req.body);

    res.status(201).json(data);
  }
}
