import { BadRequestError, NotFoundError } from '../../../library/helpers/errors';
import { CreateUserDTO, UpdateUserDTO } from '../dtos';
import { UserRepository } from '../repositories';
import { IUser } from '../types/user';

type IGetAllUsers = Partial<IUser> & { page?: number; pageSize?: number; sortBy?: string };
export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers({ page, pageSize, sortBy, ...params }: IGetAllUsers) {
    return this.userRepository.find(params, { page, pageSize, sortBy });
  }

  async getOneUser(query: Partial<IUser>) {
    const user = await this.userRepository.findOne(query);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async createUser(user: CreateUserDTO) {
    const existingUser = this.userRepository.findOne({email: user.email})
    if(!existingUser) throw new BadRequestError("User exists")

    return this.userRepository.create(user);
  }

  updateUser(query: Partial<IUser>, updatedData: UpdateUserDTO) {
    const updatedUser = this.userRepository.update(query, updatedData);
    if (!updatedUser) {
      throw new NotFoundError('User not found');
    }
    return updatedUser;
  }

  deleteUser(query: Partial<IUser>) {
    const deletedUser = this.userRepository.delete(query);
    if (!deletedUser) {
      throw new NotFoundError('User not found');
    }
    return deletedUser;
  }

  async getAverageAgeByCity(minAge: number) {
    if (minAge < 0) {
      throw new BadRequestError('Minimum age cannot be negative.');
    }
    return this.userRepository.getAverageAgeByCity(minAge);
  }
}
