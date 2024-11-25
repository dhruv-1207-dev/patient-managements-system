import bcryptjs = require('bcryptjs');
import { Request, Response } from 'express';
import { Constants } from '../../config/constants';

export class AdminMiddleware {
  public checkCredentials = async (
    req: Request,
    res: Response,
    next: () => void
  ) => {
    const admin = {
      firstName: 'Dhruv',
      lastName: 'Parmar',
      email: req.body.email,
      id: 1,
    };
    req.body._authentication = admin;
    next();
    // get user detail by email address
  };
}
