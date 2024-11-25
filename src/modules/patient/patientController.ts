import { Response } from 'express';
import { Constants } from '../../config/constants';
import { UserUtils } from '../user/userUtils';
import mongoose from 'mongoose';

export class PatientController {
  private userUtils = new UserUtils();
  public getPatient = async (req, res: Response) => {
    try {
      const userDetails = await this.userUtils.getUser({ _id: req.params.id });
      console.log(req._user.role, userDetails.role);

      if (req._user.role === Constants.ROLES.PATIENT.value) {
        if (userDetails._id.equals(req._user.id)) {
          return res.status(Constants.SUCCESS_CODE).json({ data: userDetails });
        } else {
          return res
            .status(Constants.UNAUTHORIZED_CODE)
            .json({ error: 'You are unauthorized' });
        }
      }

      if(req.user.role === Constants.ROLES.DOCTOR.value){
        
      }


      return res.status(Constants.SUCCESS_CODE).json({ data: userDetails });
    } catch (error) {
      console.log(error);

      return res
        .status(Constants.INTERNAL_SERVER_ERROR_CODE)
        .json({ error: 'INTERNAL SERVER ERROR' });
    }
  };

  public updatePatient = async (req, res: Response) => {
    try {
      const userDetails = await this.userUtils.updateUser(req.body, {
        _id: req.params.id,
      });
      return res
        .status(Constants.SUCCESS_CODE)
        .json({ data: userDetails, message: 'Record updated successfully' });
    } catch (error) {
      return res
        .status(Constants.INTERNAL_SERVER_ERROR_CODE)
        .json({ error: 'INTERNAL SERVER ERROR' });
    }
  };
  public deletePatient = async (req, res: Response) => {
    try {
      await this.userUtils.updateUser(req.body, {
        _id: req.params.id,
      });
      return res
        .status(Constants.SUCCESS_CODE)
        .json({ message: 'Record deleted successfully' });
    } catch (error) {
      return res
        .status(Constants.INTERNAL_SERVER_ERROR_CODE)
        .json({ error: 'INTERNAL SERVER ERROR' });
    }
  };
}
