import { Router } from 'express';
import { Middleware } from '../../middleware';
import { Validator } from '../../validate';
import { UserMiddleware } from '../user/userMiddleware';
import { AppointmentController } from './appointmentController';
import { AppoientmentMiddleware } from './appointmentMiddleware';
import { CreateModel, UpdateModel } from './appointmentModel';

const router: Router = Router();
const middleware = new Middleware();
const v: Validator = new Validator();
const appointmentController = new AppointmentController();
const userMiddleware = new UserMiddleware();
const appoientmentMiddleware = new AppoientmentMiddleware();

router.post(
  '/create',
  middleware.getAdminAuthorized,
  v.validate(CreateModel),
  appointmentController.create
);

router.post(
  '/update/:id',
  middleware.getAdminAuthorized,
  v.validate(UpdateModel),
  appoientmentMiddleware.validAppoientment,
  appointmentController.update
);

router.post(
  '/delete/:id',
  middleware.getAdminAuthorized,
  appointmentController.delete
);

router.get(
  '/:id',
  middleware.getAdminAuthorized,
  appoientmentMiddleware.detailsMiddleware,
  appointmentController.details
);

export const AppointmentRoute: Router = router;
