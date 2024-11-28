import { UserRepository } from "../repositories";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

   
     getAllUsers(page: number, pageSize: number, sortBy: string) {
        const skip = (page - 1) * pageSize;
        return this.userRepository.getAllUsers(skip, pageSize, sortBy);
    }

    getUserById(id: number) {
        const user = this.userRepository.getUserById(id);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }

    createUser(name: string, email: string) {
        const newUser = { id: Date.now(), name, email };
        return this.userRepository.createUser(newUser);
    }

    updateUser(id: number, updatedData: { name?: string; email?: string }) {
        const updatedUser = this.userRepository.updateUser(id, updatedData);
        if (!updatedUser) {
            throw new Error("User not found");
        }
        return updatedUser;
    }

    deleteUser(id: number) {
        const deletedUser = this.userRepository.deleteUser(id);
        if (!deletedUser) {
            throw new Error("User not found");
        }
        return deletedUser;
    }

    async getAverageAgeByCity(minAge: number) {
        if (minAge < 0) {
            throw new Error("Minimum age cannot be negative.");
        }
        return this.userRepository.getAverageAgeByCity(minAge);
    }
}
