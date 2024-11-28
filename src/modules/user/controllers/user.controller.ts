import { Request, Response } from 'express';
import { UserService } from '../services';
import { SuccessResponse } from '../../../library/helpers/response';
import { HttpStatusCode } from '../../../library/constants/httpStatusCode';

const userService = new UserService();

export class UserController {
  async index(req: Request, res: Response) {
    const { page = 1, pageSize = 10 } = req.query;

    const outcome = await userService.getAllUsers({
      ...req.query,
      page: parseInt(page as string),
      pageSize: parseInt(pageSize as string),
    });

    return new SuccessResponse('User fetched successfully', outcome).send(res);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const outcome = await userService.getOneUser({ id });
    return new SuccessResponse('User fetched successfully', outcome).send(res);
  }

  getAverageAgeByCity = async (req: Request, res: Response) => {
    const { minAge = 0 } = req.query;
    const outcome = await userService.getAverageAgeByCity(parseInt(minAge as string));
    return new SuccessResponse('User fetched successfully', outcome).send(res);
  };

  async create(req: Request, res: Response) {
    const outcome = await userService.createUser(req.body);
    return new SuccessResponse('User created successfully', outcome).send(res, HttpStatusCode.CREATED);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const outcome = await userService.updateUser({ id }, req.body);
    return new SuccessResponse('User updated successfully', outcome).send(res);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const outcome = await userService.deleteUser({ id });
    return new SuccessResponse('User deleted successfully', outcome).send(res);
  }
}
