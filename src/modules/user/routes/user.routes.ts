import { Router } from 'express';
import { UserController } from '../controllers';
import { validateDTO } from '../../../library/middleware/validator';
import { CreateUserDTO, UpdateUserDTO } from '../dtos';
import { tryCatcher } from '../../../library/middleware/tryCatcher';

const router = Router();
const userController = new UserController();

router.get('/', tryCatcher(userController.index));
router.get('/average-age', tryCatcher(userController.getAverageAgeByCity));
router.get('/:id', tryCatcher(userController.show));
router.post('/', validateDTO(CreateUserDTO), tryCatcher(userController.create));
router.put('/:id', validateDTO(UpdateUserDTO), tryCatcher(userController.update));
router.delete('/:id', tryCatcher(userController.delete));

export default router;
