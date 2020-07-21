import mongoose, { Schema, Document } from "mongoose";

export interface UserInterface extends Document {
  username: string,
  password: string
}

const BookSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const Users = mongoose.model<UserInterface>("Users", BookSchema);
export default Users;
