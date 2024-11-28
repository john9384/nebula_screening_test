import { User } from "../types/user";

let users: User[] = []; // Temporary in-memory storage

export class UserRepository {
    getAllUsers(): User[] {
        return users;
    }

    getUserById(id: number): User | undefined {
        return users.find((user) => user.id === id);
    }

    createUser(user: User): User {
        users.push(user);
        return user;
    }

    updateUser(id: number, updatedData: Partial<User>): User | null {
        const userIndex = users.findIndex((user) => user.id === id);
        if (userIndex === -1) return null;

        users[userIndex] = { ...users[userIndex], ...updatedData };
        return users[userIndex];
    }

    deleteUser(id: number): User | null {
        const userIndex = users.findIndex((user) => user.id === id);
        if (userIndex === -1) return null;

        const [deletedUser] = users.splice(userIndex, 1);
        return deletedUser;
    }
}