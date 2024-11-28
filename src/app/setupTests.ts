import { applicationConfig } from '.';
import supertest from 'supertest';

export const supertestRequest = supertest(applicationConfig());
