import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/user";

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
    },
    { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
