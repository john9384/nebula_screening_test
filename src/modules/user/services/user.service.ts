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
    const users = await this.userRepository.find(params, { page, pageSize, sortBy });
    return users.map(user => this.userRepository.serialize(user))
  }

  async getOneUser(query: Partial<IUser>) {
    const user = await this.userRepository.findOne(query);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return this.userRepository.serialize(user);
  }

  async createUser(user: CreateUserDTO) {
    const existingUser = await this.userRepository.findOne({ email: user.email });
    if (existingUser) throw new BadRequestError('User exists');

    const newUser =  await this.userRepository.create(user);

    return this.userRepository.serialize(newUser)
  }

  async updateUser(query: Partial<IUser>, updatedData: UpdateUserDTO) {
    const updatedUser = await this.userRepository.update(query, updatedData);
    if (!updatedUser) {
      throw new NotFoundError('User not found');
    }
    return this.userRepository.serialize(updatedUser);
  }

  async deleteUser(query: Partial<IUser>) {
    const deletedUser = this.userRepository.delete(query);
    if (!deletedUser) {
      throw new NotFoundError('User not found');
    }
    return {...query, deleted: true};
  }

  async getAverageAgeByCity(minAge: number) {
    if (minAge < 0) {
      throw new BadRequestError('Minimum age cannot be negative.');
    }
    return this.userRepository.getAverageAgeByCity(minAge);
  }
}
