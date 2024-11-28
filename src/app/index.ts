import express, { Application, Request, Response } from 'express';
import appRouter from './routes';
import { NotFoundError } from '../library/helpers/errors';
import globalErrorHandler from '../library/helpers/globalErrorHandler';

export function applicationConfig(): Application {
  const app: Application = express();

  // Middleware
  app.use(express.json());

  app.use('/', appRouter);
  app.use((_req, _res, next) => next(new NotFoundError()));

  app.use(globalErrorHandler);

  return app;
}
