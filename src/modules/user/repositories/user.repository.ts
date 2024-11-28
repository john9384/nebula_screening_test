import { BaseRepository } from '../../../database/BaseRepository';
import { UserModel } from '../models';
import { IUser } from '../types/user';

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(UserModel);
  }

  // Add custom user-specific queries if needed
  async getAverageAgeByCity(minAge: number): Promise<any> {
    return UserModel.aggregate([
      { $match: { age: { $gte: minAge } } },
      {
        $group: {
          _id: '$city',
          averageAge: { $avg: '$age' },
          totalUsers: { $sum: 1 },
        },
      },
      { $sort: { averageAge: -1 } },
    ]);
  }
}
