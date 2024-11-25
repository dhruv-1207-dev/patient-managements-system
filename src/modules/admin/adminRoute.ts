import { Router } from 'express';
import { Middleware } from '../../middleware';
import { Validator } from '../../validate';
import { AdminController } from './adminController';
import { AdminMiddleware } from './adminMiddleware';

import {
    AuthModel,
  } from './adminModel';

const router: Router = Router();
const v: Validator = new Validator();
const adminController = new AdminController();
const middleware = new Middleware();
const adminMiddleware = new AdminMiddleware();

router.post('/sign-in', v.validate(AuthModel), adminMiddleware.checkCredentials, adminController.login);

export const AdminRoute: Router = router;