import { Router } from 'express';
import { UserMiddleware } from '../user/userMiddleware';
import { SignInModel, UpdateUserModel } from '../user/userModel';
import { UserController } from '../user/userController';
import { Validator } from '../../validate';
import { PatientController } from './patientController';
import { Middleware } from '../../middleware';

const router: Router = Router();
const middleware = new Middleware();
const v: Validator = new Validator();
const userMiddleware = new UserMiddleware();
const userController = new UserController();
const patientController = new PatientController();

router.post(
  '/sign-in',
  v.validate(SignInModel),
  userMiddleware.checkCredentials,
  userController.signIn
);

router.get('/:id', middleware.getAdminAuthorized, patientController.getPatient);

router.post(
  '/update/:id',
  v.validate(UpdateUserModel),
  middleware.getAdminAuthorized,
  patientController.updatePatient
);

router.post(
  '/delete/:id',
  middleware.getAdminAuthorized,
  patientController.deletePatient
);

export const PatientRoute: Router = router;
