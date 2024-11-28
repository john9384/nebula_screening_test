import { Request, Response } from 'express';
import { UserService } from '../services';
import { SuccessResponse } from '../../../library/helpers/response';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async index(req: Request, res: Response) {
    const { page = 1, pageSize = 10, sortBy = 'createdAt' } = req.query;

    const outcome = await this.userService.getAllUsers(
      parseInt(page as string),
      parseInt(pageSize as string),
      sortBy as string,
    );

    return new SuccessResponse("User fetched successfully", outcome).send(res)
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const outcome = await this.userService.getUserById(parseInt(id));
    return new SuccessResponse("User fetched successfully", outcome).send(res)
  }

  async create(req: Request, res: Response) {
    const { name, email } = req.body;
    const outcome = this.userService.createUser(name, email);
     return new SuccessResponse("User fetched successfully", outcome).send(res)
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email } = req.body;
    const outcome = await this.userService.updateUser(parseInt(id), { name, email })
    return new SuccessResponse("User fetched successfully", outcome).send(res)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const outcome = await this.userService.deleteUser(parseInt(id));
    return new SuccessResponse("User fetched successfully", outcome).send(res)
  }

  getAverageAgeByCity = async (req: Request, res: Response) => {
    const { minAge = 0 } = req.query;
    const outcome = await this.userService.getAverageAgeByCity(parseInt(minAge as string));
    return new SuccessResponse("User fetched successfully", outcome).send(res)
  };
}
