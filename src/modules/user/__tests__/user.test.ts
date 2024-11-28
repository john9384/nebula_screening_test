import request from 'supertest';
import { connectTestDB, clearTestDB, closeTestDB } from '../../../database/testDB';
import { UserModel } from '../models';
import { applicationConfig } from '../../../app';
import { IUser } from '../types/user';

const app = applicationConfig();

beforeAll(async () => {
  await connectTestDB();
});

afterEach(async () => {
  await clearTestDB();
});

afterAll(async () => {
  await closeTestDB();
});

describe('User Endpoints', () => {
  it('should create a new user', async () => {
    const user = { name: 'John Doe', email: 'john.doe@example.com', age: 25 };

    const res = await request(app).post('/users').send(user);

    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      success: true,
      message: 'User created successfully',
      content: expect.objectContaining({
        name: 'John Doe',
        email: 'john.doe@example.com',
        age: 25,
      }),
    });

    const userInDB = await UserModel.findOne({ email: user.email });
    expect(userInDB).not.toBeNull();
  });

  it('should retrieve all users', async () => {
    await UserModel.create([
      { name: 'Alice', email: 'alice@example.com', age: 30 },
      { name: 'Bob', email: 'bob@example.com', age: 20 },
    ]);

    const res = await request(app).get('/users');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.content).toHaveLength(2);
  });

  it('should retrieve a user by ID', async () => {
    const user = await UserModel.create({ name: 'Charlie', email: 'charlie@example.com', age: 35 });

    const res = await request(app).get(`/users/${user.id}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.content).toEqual(expect.objectContaining({ name: 'Charlie' }));
  });

  it('should update a user', async () => {
    const user = await UserModel.create({ name: 'Diana', email: 'diana@example.com', age: 40 });

    const updateData = { name: 'Diana Prince', age: 41 };
    const res = await request(app).put(`/users/${user.id}`).send(updateData);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.content).toEqual(expect.objectContaining(updateData));

    const updatedUser = (await UserModel.findById(user.id)) as IUser;
    expect(updatedUser?.name).toBe('Diana Prince');
    expect(updatedUser?.age).toBe(41);
  });

  it('should delete a user', async () => {
    const user = await UserModel.create({ name: 'Eve', email: 'eve@example.com', age: 28 });

    const res = await request(app).delete(`/users/${user.id}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('User deleted successfully');

    const deletedUser = await UserModel.findById(user.id);
    expect(deletedUser).toBeNull();
  });

  it('should handle validation errors', async () => {
    const invalidUser = { name: 'A', email: 'not-an-email', age: 15 };

    const res = await request(app).post('/users').send(invalidUser);

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain('Name must be between 3 and 50 characters long.');
    expect(res.body.message).toContain('Email must be a valid email address.');
    expect(res.body.message).toContain('Age must be at least 18.');
  });

  it('should handle not found errors', async () => {
    const res = await request(app).get('/users/unknownid');

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('User not found');
  });
});
