import { BaseRepository } from '../../../database/BaseRepository';
import { UserModel } from '../models';
import { IUser } from '../types/user';
import {Document } from 'mongoose'

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

  public  serialize(user: IUser) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      age: user.age,
      city: user.city,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
