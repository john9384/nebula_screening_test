import * as dotenv from 'dotenv';

dotenv.config();

export default {
  appName: 'Nebula Test',
  appPort: Number(process.env.PORT),
  apiPrefix: `/api/${process.env.API_VERSION}`,
  db: {
    url: process.env.MONGODB_URL,
    testUrl: process.env.MONGODB_TEST_URL,
  },
};
