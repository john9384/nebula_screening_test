export interface IUser {
  id: string;
  _id: string;
  name: string;
  email: string;
  age: number;
  city: string;
  createdAt?: Date;
  updatedAt?: Date;
}
