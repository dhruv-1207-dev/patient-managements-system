import { Validator } from '../../validate';
import { Router } from 'express';
import { UserMiddleware } from '../user/userMiddleware';
import { SignInModel } from '../user/userModel';
import { UserController } from '../user/userController';
import { SignUpModel } from './doctorModel';

const router: Router = Router();
const v: Validator = new Validator();
const userMiddleware = new UserMiddleware();
const userController = new UserController();

router.post(
  '/sign-up',
  v.validate(SignUpModel),
  userMiddleware.checkUserExists,
  userController.signUp
);

router.post(
  '/sign-in',
  v.validate(SignInModel),
  userMiddleware.checkCredentials,
  userController.signIn
);

export const DoctorRoute: Router = router;
