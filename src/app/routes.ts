import { config } from '../config';
import { userRoutes } from '../modules/user/routes';
import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send({
    appName: config.appName,
    status: 'Running',
  });
});

router.use(`${config.apiPrefix}/users`, userRoutes);

export default router;
