import { Constants } from '../../config/constants';
import { Jwt } from '../../helpers/jwt';
import { Response } from 'express';
import { UserUtils } from './userUtils';

export class UserController {
  private userUtils = new UserUtils();
  public signIn = async (req: any, res: Response) => {
    try {
      const { email, _id, isDeleted, role } = req.body._authentication;
      const userDetails = {
        token: await Jwt.getAuthToken({
          id: _id,
        }),
        email,
        role,
        id: _id,
      };
      return res
        .status(Constants.SUCCESS_CODE)
        .json({ data: userDetails, message: 'SignIn successfully' });
    } catch (error) {
      return res
        .status(Constants.INTERNAL_SERVER_ERROR_CODE)
        .json({ error: 'INTERNAL SERVER ERROR' });
    }
  };

  public signUp = async (req: any, res: Response) => {
    try {
      const user = await this.userUtils.signUp(req.body);
      const token = await Jwt.getAuthToken({
        id: user._id,
      });
      return res.status(Constants.SUCCESS_CODE).json({
        data: { ...user.toObject(), token },
        message: 'Signup successfully',
      });
    } catch (error) {
      return res
        .status(Constants.INTERNAL_SERVER_ERROR_CODE)
        .json({ error: 'INTERNAL SERVER ERROR' });
    }
  };
}
