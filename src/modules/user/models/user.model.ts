import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/user";

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        age: { type: Number, default: 0 },
        city: { type: String, default: "Unknown" },
    },
    { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
