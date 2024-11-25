import { Router } from 'express';
import { Middleware } from '../../middleware';
import { Validator } from '../../validate';
import { UserController } from './userController';
import { UserMiddleware } from './userMiddleware';

import { SignInModel, SignUpModel } from './userModel';

const router: Router = Router();
const middleware = new Middleware();
const v: Validator = new Validator();
const userController = new UserController();
const userMiddleware = new UserMiddleware();

router.post(
  '/sign-in',
  v.validate(SignInModel),
  userMiddleware.checkCredentials,
  userController.signIn
);

router.post(
  '/sign-up',
  middleware.getAdminAuthorized,
  v.validate(SignUpModel),
  userMiddleware.checkUserExists,
  userController.signUp
);

export const UserRoute: Router = router;
