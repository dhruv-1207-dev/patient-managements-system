import { ObjectId } from 'bson';
import { Request, Response } from 'express';
import { Constants } from '../../config/constants';
import { AppointmentUtils } from './appontmentUtils';

export class AppoientmentMiddleware {
  private appoientmentUtils = new AppointmentUtils();
  public validAppoientment = async (
    req: Request,
    res: Response,
    next: () => void
  ) => {
    if (req._user.role === Constants.ROLES.PATIENT.value) {
      const valid = await this.appoientmentUtils.checkExists({
        patientId: req._user._id,
        _id: req.params.id,
      });
      if (valid) {
        if (
          req.body.hasOwnProperty('available') &&
          req.body.hasOwnProperty('patientId')
        ) {
          return res
            .status(Constants.UNAUTHORIZED_CODE)
            .json({ error: 'You are unauthorized' });
        }
        next();
      } else {
        return res
          .status(Constants.UNAUTHORIZED_CODE)
          .json({ error: 'You are unauthorized' });
      }
    } else if (req._user.role === Constants.ROLES.DOCTOR.value) {
      const valid = await this.appoientmentUtils.checkExists({
        doctorId: req._user._id,
        _id: req.params.id,
      });
      if (valid) {
        next();
      } else {
        return res
          .status(Constants.UNAUTHORIZED_CODE)
          .json({ error: 'You are unauthorized' });
      }
    } else {
      next();
    }
  };

  public detailsMiddleware = async (
    req: Request,
    res: Response,
    next: () => void
  ) => {
    if (req._user.role === Constants.ROLES.PATIENT.value) {
      const valid = await this.appoientmentUtils.checkExists({
        patientId: req._user._id,
        _id: req.params.id,
      });
      if (valid) {
        next();
      } else {
        return res
          .status(Constants.UNAUTHORIZED_CODE)
          .json({ error: 'You are unauthorized' });
      }
    } else if (req._user.role === Constants.ROLES.DOCTOR.value) {
      const valid = await this.appoientmentUtils.checkExists({
        doctorId: req._user._id,
        _id: req.params.id,
      });
      console.log(valid);
      
      if (valid) {
        next();
      } else {
        return res
          .status(Constants.UNAUTHORIZED_CODE)
          .json({ error: 'You are unauthorized' });
      }
    } else {
      next();
    }
  };
}
