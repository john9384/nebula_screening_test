import { config } from "../config";
import { userRoutes } from "../modules/user/routes";
import {Router, Request, Response} from 'express'

const router = Router();

router.get('/', (_:Request, res: Response) => {
  res.status(200).send({ msg: 'Nebula api running ' });
});

router.use(`${config.apiPrefix}/user`, userRoutes);