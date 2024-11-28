import { Request, Response } from "express";
import { UserService } from "../services";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async index(req: Request, res: Response) {
        const users = this.userService.getAllUsers();
        res.status(200).json({ users });
    };

    async show (req: Request, res: Response){
        const { id } = req.params;
        try {
            const user = this.userService.getUserById(parseInt(id));
            res.status(200).json({ user });
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    };

    async create (req: Request, res: Response){
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ message: "Name and email are required." });
        }

        const user = this.userService.createUser(name, email);
        res.status(201).json({ message: "User created successfully.", user });
    };

    async update (req: Request, res: Response) {
        const { id } = req.params;
        const { name, email } = req.body;

        try {
            const updatedUser = this.userService.updateUser(parseInt(id), { name, email });
            res.status(200).json({ message: "User updated successfully.", user: updatedUser });
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    };

    async delete (req: Request, res: Response)  {
        const { id } = req.params;

        try {
            const deletedUser = this.userService.deleteUser(parseInt(id));
            res.status(200).json({ message: "User deleted successfully.", user: deletedUser });
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    };
}