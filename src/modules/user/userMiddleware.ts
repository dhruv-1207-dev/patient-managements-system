import { Request, Response } from 'express';
import bcryptjs = require('bcryptjs');
import { Constants } from '../../config/constants';
import { UserUtils } from './userUtils';

export class UserMiddleware {
  private userUtils = new UserUtils();
  public checkCredentials = async (
    req: Request,
    res: Response,
    next: () => void
  ) => {
    const user = await this.userUtils.getUser({
      email: req.body.email,
      role: req.body.role,
    });

    if (!user) {
      return res
        .status(Constants.NOT_FOUND_CODE)
        .json({ error: 'User not found' });
    }

    const validUser = await bcryptjs.compare(req.body.password, user.password);
    if (validUser) {
      req.body._authentication = user;
      next();
    } else {
      return res
        .status(Constants.UNAUTHORIZED_CODE)
        .json({ error: 'Invalid Credential' });
    }
  };

  public checkUserExists = async (
    req: Request,
    res: Response,
    next: () => void
  ) => {
    const user = await this.userUtils.getUser({
      email: req.body.email,
    });
    if (user) {
      return res
        .status(Constants.DUPLICATE_CODE)
        .json({ error: 'User already exists' });
    }
    next();
  };
}
