import Appointment from '../../models/appointment';

export class AppointmentUtils {
  public create = async (data) => {
    return await Appointment.create(data);
  };

  public checkExists = async (condition) => {
    return await Appointment.findOne(condition);
  };

  public update = async (data, condition) => {
      
    return await Appointment.findOneAndUpdate(
      { ...condition },
      { $set: data },
      { new: false }
    );
  };
}
