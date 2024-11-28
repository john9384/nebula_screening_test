import 'reflect-metadata';
import { Application } from 'express';
import { applicationConfig } from '../app';
import { config } from '../config';
import { connectDB } from '../database';

initializeServer()
  .then(() => {
    console.log(`====== ${config.appName} running on port ${config.appPort} ======`);
  })
  .catch((error: Error) => {
    console.error(error);
    throw error;
  });

async function initializeServer(): Promise<void> {
  const PORT = config.appPort || 3000;
  const application: Application = applicationConfig();

  await connectDB();

  application.listen(PORT, '0.0.0.0', () => true);
}
