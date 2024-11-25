import { Constants } from '../../config/constants';
import { Jwt } from '../../helpers/jwt';
import { Response } from 'express';

export class AdminController {
  public login = async (req: any, res: Response) => {
    const { firstName, lastName, email, id } = req.body._authentication;
    const adminDetails = {
      token: Jwt.getAuthToken({ userId: id }),
      email,
      firstName,
      lastName,
    };
    res
      .status(Constants.SUCCESS_CODE)
      .json({ data: adminDetails, message: 'Login successfully' });
  };
}
