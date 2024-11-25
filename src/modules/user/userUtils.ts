import bcryptjs = require('bcryptjs');
import { Constants } from '../../config/constants';
import User from '../../models/user';

export class UserUtils {
  public signUp = async (data) => {
    data.password = bcryptjs.hashSync(
      data.password,
      Constants.HASH_STRING_LIMIT
    );
    return await User.create(data);
  };

  public getUser = async (data) => {
    return await User.findOne({ ...data, isDeleted: false });
  };

  public updateUser = async (data, condition) => {
    if (data.password) {
      data.password = bcryptjs.hashSync(
        data.password,
        Constants.HASH_STRING_LIMIT
      );
    }
    return await User.findOneAndUpdate(
      { ...condition },
      { $set: data },
      { new: false }
    );
  };
}
