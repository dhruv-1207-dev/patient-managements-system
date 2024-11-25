import { Response } from 'express';
import { Constants } from '../../config/constants';
import { AppointmentUtils } from './appontmentUtils';

export class AppointmentController {
  private appointmentUtils = new AppointmentUtils();

  public create = async (req, res: Response) => {
    try {
      const isExists = await this.appointmentUtils.checkExists({
        doctorId: req.body.doctorId,
        patientId: req.body.patientId,
      });
      if (isExists) {
        return res
          .status(Constants.DUPLICATE_CODE)
          .json({ error: 'Appoientment already Booked' });
      }
      const data = await this.appointmentUtils.create(req.body);
      return res.status(Constants.SUCCESS_CODE).json({
        data,
        message: 'Appoientment booked successfully',
      });
    } catch (error) {
      return res
        .status(Constants.INTERNAL_SERVER_ERROR_CODE)
        .json({ error: 'INTERNAL SERVER ERROR' });
    }
  };

  public update = async (req, res: Response) => {
    try {
      const isExists = await this.appointmentUtils.checkExists({
        doctorId: req.body.doctorId,
        patientId: req.body.patientId,
        isDeleted: false,
      });
      if (isExists) {
        return res
          .status(Constants.DUPLICATE_CODE)
          .json({ error: 'Appoientment already Booked' });
      }
      const data = await this.appointmentUtils.update(req.body, {
        _id: req.params.id,
      });
      return res.status(Constants.SUCCESS_CODE).json({
        data,
        message: 'Appoientment update successfully',
      });
    } catch (error) {
      return res
        .status(Constants.INTERNAL_SERVER_ERROR_CODE)
        .json({ error: 'INTERNAL SERVER ERROR' });
    }
  };

  public delete = async (req, res: Response) => {
    try {
      const isExists = await this.appointmentUtils.checkExists({
        _id: req.params.id,
        isDeleted: false,
      });
      if (isExists) {
        const data = await this.appointmentUtils.update(req.body, {
          _id: req.params.id,
        });
        return res.status(Constants.SUCCESS_CODE).json({
          data,
          message: 'Appoientment deleted successfully',
        });
      } else {
        return res
          .status(Constants.DUPLICATE_CODE)
          .json({ error: 'Appoientment not found' });
      }
    } catch (error) {
      return res
        .status(Constants.INTERNAL_SERVER_ERROR_CODE)
        .json({ error: 'INTERNAL SERVER ERROR' });
    }
  };

  public details = async (req, res: Response) => {
    try {
      const isExists = await this.appointmentUtils.checkExists({
        _id: req.params.id,
        isDeleted: false,
      });
      if (isExists) {
        return res.status(Constants.SUCCESS_CODE).json({
          data: isExists,
        });
      } else {
        return res
          .status(Constants.DUPLICATE_CODE)
          .json({ error: 'Appoientment not found' });
      }
    } catch (error) {
      return res
        .status(Constants.INTERNAL_SERVER_ERROR_CODE)
        .json({ error: 'INTERNAL SERVER ERROR' });
    }
  };
}
