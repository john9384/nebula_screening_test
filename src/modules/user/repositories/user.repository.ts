import { UserModel } from "../models";
import { IUser } from "../types/user";


export class UserRepository {
    async getAllUsers(skip: number, limit: number, sortBy: string): Promise<IUser[]> {
        return UserModel.find().sort({ [sortBy]: 1 }).skip(skip).limit(limit);
    }

    async getUserById(id: string): Promise<IUser | null> {
        return UserModel.findById(id);
    }

    async createUser(data: { name: string; email: string }): Promise<IUser> {
        const newUser = new UserModel(data);
        return newUser.save();
    }

    async updateUser(id: string, updatedData: Partial<IUser>): Promise<IUser | null> {
        return UserModel.findByIdAndUpdate(id, updatedData, { new: true });
    }

    async deleteUser(id: string): Promise<IUser | null> {
        return UserModel.findByIdAndDelete(id);
    }
    
}
