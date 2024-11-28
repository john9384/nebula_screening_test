import express, { Application, Request, Response } from 'express';
import connectDB from '../database/connect';
import globalErrorHandler from '../library/middleware/globalErrorHandler';

function initializeApplication(): Application {
  const app: Application = express();
  const PORT = 3000;

  connectDB();

  app.use(express.json());
  app.use(globalErrorHandler);

  // Root Route
  app.get('/', (req: Request, res: Response) => {
    res.send('Server is up and running!');
  });

  return app;
}
